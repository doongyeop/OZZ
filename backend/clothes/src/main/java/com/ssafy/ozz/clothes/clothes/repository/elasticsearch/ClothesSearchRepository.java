package com.ssafy.ozz.clothes.clothes.repository.elasticsearch;

import com.ssafy.ozz.clothes.clothes.domain.ClothesDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClothesSearchRepository extends ElasticsearchRepository<ClothesDocument, Long> {
    Page<ClothesDocument> findAllByName(String name, Pageable pageable);
}