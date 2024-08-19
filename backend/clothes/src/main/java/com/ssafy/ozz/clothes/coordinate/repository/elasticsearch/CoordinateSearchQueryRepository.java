package com.ssafy.ozz.clothes.coordinate.repository.elasticsearch;

import com.ssafy.ozz.clothes.coordinate.domain.CoordinateDocument;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateSearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CoordinateSearchQueryRepository {
    Page<CoordinateDocument> findByCondition(CoordinateSearchCondition condition, Pageable pageable);
}