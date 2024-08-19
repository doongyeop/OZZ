package com.ssafy.ozz.clothes.clothes.dto.response;

import com.ssafy.ozz.clothes.category.domain.CategoryLow;
import com.ssafy.ozz.clothes.category.dto.CategoryLowResponse;
import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.clothes.clothes.domain.ClothesDocument;
import com.ssafy.ozz.library.file.FileInfo;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "옷 기본 정보 DTO")
public record ClothesBasicWithFileResponse(
        Long clothesId,
        String name,
        LocalDateTime createdDate,
        CategoryLowResponse categoryLow,
        FileInfo imageFile
        ) {
    public ClothesBasicWithFileResponse(Clothes clothes, FileInfo fileInfo) {
        this(
                clothes.getClothesId(),
                clothes.getName(),
                clothes.getCreatedDate(),
                CategoryLowResponse.of(clothes.getCategoryLow()),
                fileInfo
        );
    }
    public ClothesBasicWithFileResponse(ClothesDocument clothes, CategoryLow categoryLow, FileInfo fileInfo) {
        this(
                clothes.getClothesId(),
                clothes.getName(),
                clothes.getCreatedDate(),
                CategoryLowResponse.of(categoryLow),
                fileInfo
        );
    }
}