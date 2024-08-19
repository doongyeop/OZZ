package com.ssafy.ozz.clothes.category.dto;

import com.ssafy.ozz.clothes.category.domain.CategoryHigh;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "상위 카테고리 정보 DTO")
public record CategoryHighResponse(
    Byte categoryHighId,
    String name,
    List<CategoryLowResponse> categoryLowList
){
    public CategoryHighResponse(CategoryHigh categoryHigh){
        this(
            categoryHigh.getCategoryHighId(),
            categoryHigh.getName(),
            categoryHigh.getCategoryLowList().stream().map(CategoryLowResponse::new).toList()
        );
    }
}
