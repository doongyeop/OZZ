package com.ssafy.ozz.clothes.coordinate.dto.response;

import com.ssafy.ozz.clothes.coordinate.domain.Coordinate;
import com.ssafy.ozz.library.clothes.properties.Style;
import com.ssafy.ozz.library.file.FileInfo;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toEnums;

@Builder
public record CoordinateResponse (
        Long coordinateId,
        String name,
        List<Style> styleList,
        LocalDateTime createdDate,
        List<CoordinateClothesBasicResponse> clothesList,
        FileInfo imageFile
){
    public static CoordinateResponse of(Coordinate coordinate, FileInfo file) {
        return CoordinateResponse.builder()
                .coordinateId(coordinate.getCoordinateId())
                .name(coordinate.getName())
                .styleList(toEnums(Style.class, coordinate.getStyle()))
                .createdDate(coordinate.getCreatedDate())
                .clothesList(coordinate.getCoordinateClothesList().stream().map(CoordinateClothesBasicResponse::of).toList())
                .imageFile(file)
                .build();
    }
}
