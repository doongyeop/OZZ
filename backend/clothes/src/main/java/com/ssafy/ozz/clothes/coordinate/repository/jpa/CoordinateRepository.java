package com.ssafy.ozz.clothes.coordinate.repository.jpa;

import com.ssafy.ozz.clothes.coordinate.domain.Coordinate;
import com.ssafy.ozz.clothes.coordinate.repository.elasticsearch.CoordinateSearchQueryRepository;
import com.ssafy.ozz.clothes.coordinate.repository.querydsl.CoordinateQueryRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordinateRepository extends JpaRepository<Coordinate, Long>, CoordinateQueryRepository, CoordinateSearchQueryRepository {
}
