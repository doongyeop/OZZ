package com.ssafy.ozz.clothes.clothes.repository.querydsl;

import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.clothes.clothes.dto.request.ClothesSearchCondition;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface ClothesQueryRepository {
    Slice<Clothes> findByUserId(Long userId, ClothesSearchCondition condition, Pageable pageable);
    List<Clothes> findByUserId(Long userId, ClothesSearchCondition condition);
}
