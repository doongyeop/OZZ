package com.ssafy.ozz.clothes.coordinate.repository.querydsl;

import com.ssafy.ozz.clothes.coordinate.domain.Coordinate;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateSearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CoordinateQueryRepository{
    List<Coordinate> findByUserId(Long userId, CoordinateSearchCondition condition);
    Page<Coordinate> findByUserId(Long userId, CoordinateSearchCondition condition, Pageable pageable);
}