package com.ssafy.ozz.favorite.global.feign.coordinate;

import com.ssafy.ozz.library.clothes.properties.Style;
import com.ssafy.ozz.library.file.FileInfo;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record CoordinateBasicResponse(
        Long coordinateId,
        String name,
        List<Style> styleList,
        LocalDateTime createdDate,
        FileInfo imageFile
){
}