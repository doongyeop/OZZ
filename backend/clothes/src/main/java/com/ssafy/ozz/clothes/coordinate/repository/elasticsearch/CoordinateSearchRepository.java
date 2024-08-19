package com.ssafy.ozz.clothes.coordinate.repository.elasticsearch;

import com.ssafy.ozz.clothes.coordinate.domain.CoordinateDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordinateSearchRepository extends ElasticsearchRepository<CoordinateDocument, Long> {
    Page<CoordinateDocument> findAllByName(String name, Pageable pageable);
}