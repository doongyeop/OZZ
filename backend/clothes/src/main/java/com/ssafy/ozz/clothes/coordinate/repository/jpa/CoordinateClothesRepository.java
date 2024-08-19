package com.ssafy.ozz.clothes.coordinate.repository.jpa;

import com.ssafy.ozz.clothes.coordinate.domain.Coordinate;
import com.ssafy.ozz.clothes.coordinate.domain.CoordinateClothes;
import com.ssafy.ozz.clothes.coordinate.domain.CoordinateClothesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoordinateClothesRepository extends JpaRepository<CoordinateClothes, CoordinateClothesId> {
    List<CoordinateClothes> findByCoordinate(Coordinate coordinate);

    @Query("select cc from CoordinateClothes cc where cc.coordinate.coordinateId = :coordinateId")
    List<CoordinateClothes> findByCoordinateId(@Param("coordinateId") Long coordinateId);

    void deleteAllByClothes_ClothesId(Long clothesId);
}
