package com.ssafy.ozz.clothes.coordinate.dto.response;

import com.ssafy.ozz.clothes.clothes.dto.response.ClothesBasicResponse;
import com.ssafy.ozz.clothes.coordinate.domain.CoordinateClothes;
import lombok.Builder;

@Builder
public record CoordinateClothesBasicResponse(
        ClothesBasicResponse clothes,
        Integer offset
){
    public CoordinateClothesBasicResponse(CoordinateClothes coordinateClothes){
        this(
            ClothesBasicResponse.of(coordinateClothes.getClothes()),
            coordinateClothes.getOffset()
        );
    }

    public static CoordinateClothesBasicResponse of(CoordinateClothes coordinateClothes){
        return coordinateClothes != null ? CoordinateClothesBasicResponse.builder()
                .clothes(ClothesBasicResponse.of(coordinateClothes.getClothes()))
                .offset(coordinateClothes.getOffset())
                .build() :null;
    }
}
