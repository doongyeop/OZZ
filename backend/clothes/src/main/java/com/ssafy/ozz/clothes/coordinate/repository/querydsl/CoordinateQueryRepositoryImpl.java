package com.ssafy.ozz.clothes.coordinate.repository.querydsl;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.ssafy.ozz.clothes.coordinate.domain.Coordinate;
import com.ssafy.ozz.clothes.coordinate.domain.QCoordinate;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateSearchCondition;
import com.ssafy.ozz.clothes.global.querydsl.Querydsl4RepositorySupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.ssafy.ozz.clothes.clothes.domain.QClothes.clothes;
import static com.ssafy.ozz.clothes.coordinate.domain.QCoordinate.coordinate;
import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toBits;

public class CoordinateQueryRepositoryImpl extends Querydsl4RepositorySupport<Coordinate, QCoordinate> implements CoordinateQueryRepository {
    public CoordinateQueryRepositoryImpl() {
        super(Coordinate.class,coordinate);
    }

    @Override
    public List<Coordinate> findByUserId(Long userId, CoordinateSearchCondition condition) {
        return selectFrom(coordinate)
                .where(
                    userIdEq(userId),
                    styleOr(toBits(condition.styleList())),
                    nameContainKeyword(condition.keyword())
                )
                .fetch();
    }

    @Override
    public Page<Coordinate> findByUserId(Long userId, CoordinateSearchCondition condition, Pageable pageable) {
        return applyPagination(pageable,
                selectFrom(coordinate)
                .where(
                    userIdEq(userId),
                    styleOr(toBits(condition.styleList())),
                    nameContainKeyword(condition.keyword())
                )
        );
    }

    public BooleanExpression userIdEq(Long userId){
        return userId != null ? coordinate.userId.eq(userId) : null;
    }

    public BooleanExpression styleOr(Integer style){
        return style != null ? Expressions.booleanTemplate("BITAND({0},{1}) != 0", coordinate.style, style) : null;
    }
    public BooleanExpression nameContainKeyword(String keyword){
        return keyword != null ? coordinate.name.contains(keyword) : null;
    }
}
