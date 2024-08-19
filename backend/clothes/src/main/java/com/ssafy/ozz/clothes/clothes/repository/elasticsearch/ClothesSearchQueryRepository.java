package com.ssafy.ozz.clothes.clothes.repository.elasticsearch;

import com.ssafy.ozz.clothes.clothes.domain.ClothesDocument;
import com.ssafy.ozz.clothes.clothes.dto.request.ClothesSearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ClothesSearchQueryRepository {
    Page<ClothesDocument> findByCondition(ClothesSearchCondition condition, Pageable pageable);
    Page<ClothesDocument> findByCondition(Long userId, ClothesSearchCondition condition, Pageable pageable);

    void update(ClothesDocument clothes);
}