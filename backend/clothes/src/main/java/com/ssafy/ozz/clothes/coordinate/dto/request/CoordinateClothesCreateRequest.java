package com.ssafy.ozz.clothes.coordinate.dto.request;

import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.clothes.coordinate.domain.Coordinate;
import com.ssafy.ozz.clothes.coordinate.domain.CoordinateClothes;
import com.ssafy.ozz.clothes.coordinate.domain.CoordinateClothesId;
import lombok.Builder;

@Builder
public record CoordinateClothesCreateRequest (
    Long clothesId,
    Integer offset
){
    public CoordinateClothes toEntity(Coordinate coordinate, Clothes clothes) {
        return CoordinateClothes.builder()
                .id(new CoordinateClothesId(coordinate.getCoordinateId(), clothesId))
                .coordinate(coordinate)
                .clothes(clothes)
                .offset(offset)
                .build();
    }
}