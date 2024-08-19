package com.ssafy.ozz.clothes.coordinate.dto.request;

import com.ssafy.ozz.clothes.coordinate.domain.Coordinate;
import com.ssafy.ozz.library.clothes.properties.Style;
import lombok.Builder;

import java.util.List;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toBits;

@Builder
public record CoordinateCreateRequest (
    String name,
    List<Style> styleList,
    List<CoordinateClothesCreateRequest> clothesList
){
    public Coordinate toEntity(Long userId, Long imageFileId){
        return Coordinate.builder()
                .name(name)
                .style(toBits(styleList))
                .userId(userId)
                .imageFileId(imageFileId)
                .build();
    }
}