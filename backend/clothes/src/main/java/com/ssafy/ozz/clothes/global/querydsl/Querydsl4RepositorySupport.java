package com.ssafy.ozz.clothes.global.querydsl;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.JpaEntityInformationSupport;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.querydsl.SimpleEntityPathResolver;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import java.util.List;
import java.util.function.Function;

@Component
public abstract class Querydsl4RepositorySupport<U,Q extends EntityPathBase<U>> {
    private final Class<U> domainClass;
    private final Q qObject;
    private Querydsl querydsl;
    private EntityManager entityManager;
    private JPAQueryFactory queryFactory;

    public Querydsl4RepositorySupport(Class<U> domainClass, Q qEntity) {
        Assert.notNull(domainClass,"Domain class must not be null.");
        Assert.notNull(qEntity,"Q Entity must not be null.");
        this.domainClass = domainClass;
        this.qObject = qEntity;
    }

    @Autowired
    public void setEntityManager(EntityManager entityManager) {
        JpaEntityInformation<U,?> entityInformation = JpaEntityInformationSupport.getEntityInformation(domainClass, entityManager);
        SimpleEntityPathResolver resolver = SimpleEntityPathResolver.INSTANCE;
        EntityPath<U> path = resolver.createPath(entityInformation.getJavaType());
        this.entityManager = entityManager;
        this.querydsl = new Querydsl(entityManager, new PathBuilder<>(path.getType(), path.getMetadata()));
    }

    @Autowired
    public void setQueryFactory(JPAQueryFactory jpaQueryFactory) {
        this.queryFactory = jpaQueryFactory;
    }

    protected JPAQueryFactory getQueryFactory() {
        return queryFactory;
    }
    protected Querydsl getQuerydsl() {
        return querydsl;
    }
    protected EntityManager getEntityManager() {
        return entityManager;
    }

    protected <T> JPAQuery<T> select(Expression<T> expr) {
        return getQueryFactory().select(expr);
    }

    protected <T> JPAQuery<T> selectFrom(EntityPath<T> from) {
        return getQueryFactory().selectFrom(from);
    }

    protected JPAQuery<?> from(EntityPath<?> ...from) {
        return getQuerydsl().createQuery().from(from);
    }

    /*
        contentQuery : pagination, sort 적용할 쿼리
        countQuery : contentQuery에서 pagination, sort 을 빼고 count를 사용한 쿼리

        countQuery가 없다면 totalPages나 totalElements같은 것을 얻을 수가 없음
        (contentQuery는 pagination이 적용되었으므로 한 page에 대한 정보만 얻기 때문)
    */
    protected <T> Page<T> applyPagination(Pageable pageable, Function<JPAQueryFactory, JPAQuery<T>> contentQuery, Function<JPAQueryFactory,JPAQuery<Long>> countQuery) {
        JPAQuery<T> jpaContentQuery = contentQuery.apply(getQueryFactory());
        List<T> content = getQuerydsl().applyPagination(pageable, jpaContentQuery).fetch();
        JPAQuery<Long> countResultQuery = countQuery.apply(getQueryFactory());

        return PageableExecutionUtils.getPage(content, pageable, countResultQuery::fetchOne);
    }

    //== 함수가 아닌 JPAQuery로만 처리 ==//
    protected <T> Page<T> applyPagination(Pageable pageable, JPAQuery<T> contentQuery, JPAQuery<Long> countQuery) {
        List<T> content = getQuerydsl().applyPagination(pageable, contentQuery).fetch();
        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    //== countQuery 자동 생성==//
    protected <T> Page<T> applyPagination(Pageable pageable, JPAQuery<T> contentQuery) {
        JPAQuery<Long> countQuery = contentQuery.clone().select(qObject.count());
        return applyPagination(pageable, contentQuery, countQuery);
    }

    //== JPAQuery가 아닌 Expression으로 처리 ==//
    protected <T> Page<T> applyPagination(Pageable pageable, Expression<T> contentExpr, Expression<Long> countExpr, JPAQuery<?> baseQuery) {
        JPAQuery<T> contentQuery = baseQuery.clone().select(contentExpr);
        JPAQuery<Long> countQuery = baseQuery.clone().select(countExpr);
        return applyPagination(pageable, contentQuery, countQuery);
    }
}