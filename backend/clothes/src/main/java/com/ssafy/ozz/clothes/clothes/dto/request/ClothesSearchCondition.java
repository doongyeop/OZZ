package com.ssafy.ozz.clothes.clothes.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description="옷 검색 DTO")
public record ClothesSearchCondition(
    Byte categoryHighId,
    Byte categoryLowId,
    String keyword
){ }
