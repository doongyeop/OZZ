package com.ssafy.ozz.favorite.global.feign.coordinate;

import com.ssafy.ozz.library.clothes.properties.Style;
import lombok.Builder;

import java.util.List;

@Builder
public record CoordinateSearchCondition(
    List<Style> styleList,
    Long favoriteGroupId,
    String keyword
){}