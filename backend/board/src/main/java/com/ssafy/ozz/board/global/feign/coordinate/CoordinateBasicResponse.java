package com.ssafy.ozz.board.global.feign.coordinate;

import lombok.Builder;
import org.apache.tomcat.jni.FileInfo;
import com.ssafy.ozz.library.clothes.properties.Style;

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
