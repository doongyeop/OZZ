package com.ssafy.ozz.clothes.category.dto;

import com.ssafy.ozz.clothes.category.domain.CategoryHigh;
import com.ssafy.ozz.clothes.category.domain.CategoryLow;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Schema(description = "상위 카테고리 기본 정보 DTO")
@Builder
public record CategoryHighBasicResponse(
    Byte categoryHighId,
    String name
){
    public CategoryHighBasicResponse(CategoryHigh categoryHigh){
        this(
            categoryHigh.getCategoryHighId(),
            categoryHigh.getName()
        );
    }
    public static CategoryHighBasicResponse of(CategoryHigh categoryHigh) {
        return categoryHigh != null ? CategoryHighBasicResponse.builder()
                .categoryHighId(categoryHigh.getCategoryHighId())
                .name(categoryHigh.getName())
                .build() : null;
    }
    public static CategoryHighBasicResponse of(CategoryLow categoryLow) {
        return (categoryLow != null && categoryLow.getCategoryHigh() != null) ? CategoryHighBasicResponse.builder()
                .categoryHighId(categoryLow.getCategoryHigh().getCategoryHighId())
                .name(categoryLow.getCategoryHigh().getName())
                .build() : null;
    }
}