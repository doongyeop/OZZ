package com.ssafy.ozz.clothes.category.dto;

import com.ssafy.ozz.clothes.category.domain.CategoryLow;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Schema(description = "하위 카테고리 정보 DTO")
@Builder
public record CategoryLowResponse (
    Byte categoryLowId,
    String name
){
    public CategoryLowResponse(CategoryLow categoryLow) {
        this(
            categoryLow.getCategoryLowId(),
            categoryLow.getName()
        );
    }

    public static CategoryLowResponse of(CategoryLow categoryLow) {
        return categoryLow != null ? CategoryLowResponse.builder()
                .categoryLowId(categoryLow.getCategoryLowId())
                .name(categoryLow.getName())
                .build() : null;
    }
}

