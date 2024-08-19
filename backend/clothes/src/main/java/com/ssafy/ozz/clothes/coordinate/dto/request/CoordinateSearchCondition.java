package com.ssafy.ozz.clothes.coordinate.dto.request;

import com.ssafy.ozz.library.clothes.properties.Style;
import lombok.Builder;

import java.util.List;

@Builder
public record CoordinateSearchCondition(
        List<Style> styleList,
        String keyword
) {
}