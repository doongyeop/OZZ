package com.ssafy.ozz.clothes.clothes.repository.querydsl;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.clothes.clothes.domain.QClothes;
import com.ssafy.ozz.clothes.clothes.dto.request.ClothesSearchCondition;
import com.ssafy.ozz.clothes.global.querydsl.Querydsl4RepositorySupport;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

import static com.ssafy.ozz.clothes.clothes.domain.QClothes.clothes;

public class ClothesQueryRepositoryImpl extends Querydsl4RepositorySupport<Clothes, QClothes> implements ClothesQueryRepository {

    public ClothesQueryRepositoryImpl() {
        super(Clothes.class, clothes);
    }

    @Override
    public Slice<Clothes> findByUserId(Long userId, ClothesSearchCondition condition, Pageable pageable) {
        return applyPagination(pageable,
                selectFrom(clothes)
                .where(
                        userIdEq(userId),
                        categoryLowEq(condition.categoryLowId()),
                        categoryHighEq(condition.categoryHighId()),
                        nameContainKeyword(condition.keyword())
                )
        );
    }

    @Override
    public List<Clothes> findByUserId(Long userId, ClothesSearchCondition condition) {
        return  selectFrom(clothes)
                .where(
                        userIdEq(userId),
                        categoryLowEq(condition.categoryLowId()),
                        categoryHighEq(condition.categoryHighId()),
                        nameContainKeyword(condition.keyword())
                ).fetch();
    }

    public BooleanExpression userIdEq(Long userId){
        return userId != null ? clothes.userId.eq(userId) : null;
    }
    public BooleanExpression categoryLowEq(Byte categoryLowId){
        return categoryLowId != null ? clothes.categoryLow.categoryLowId.eq(categoryLowId) : null;
    }
    public BooleanExpression categoryHighEq(Byte categoryHighId){
        return categoryHighId != null ? clothes.categoryLow.categoryHigh.categoryHighId.eq(categoryHighId) : null;
    }
    public BooleanExpression nameContainKeyword(String keyword){
        return keyword != null ? clothes.name.contains(keyword) : null;
    }
}
