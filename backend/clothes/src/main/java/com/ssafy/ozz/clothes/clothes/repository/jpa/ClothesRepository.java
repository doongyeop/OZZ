package com.ssafy.ozz.clothes.clothes.repository.jpa;

import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.clothes.clothes.repository.elasticsearch.ClothesSearchQueryRepository;
import com.ssafy.ozz.clothes.clothes.repository.elasticsearch.ClothesSearchRepository;
import com.ssafy.ozz.clothes.clothes.repository.querydsl.ClothesQueryRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes,Long>, ClothesQueryRepository, ClothesSearchQueryRepository {
    Slice<Clothes> findByUserId(Long userId, Pageable pageable);
    List<Clothes> findAllByUserIdAndProcessingLessThanEqual(Long userId,Integer processing);
}
