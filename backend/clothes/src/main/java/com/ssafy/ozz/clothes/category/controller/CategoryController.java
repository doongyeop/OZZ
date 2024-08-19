package com.ssafy.ozz.clothes.category.controller;

import com.ssafy.ozz.clothes.category.dto.CategoryHighResponse;
import com.ssafy.ozz.clothes.category.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Category API", description = "카테고리 관리 API")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    @Operation(summary = "상위 카테고리 목록 세부 조회", description = "상위, 하위의 모든 카테고리 정보를 조회합니다.")
    public ResponseEntity<List<CategoryHighResponse>> getCategories() {
        return ResponseEntity.ok(categoryService.getAllCategoryHigh().stream().map(CategoryHighResponse::new).toList());
    }

    @GetMapping("/{categoryHighId}")
    @Operation(summary = "특정 상위 카테고리의 하위 카테고리 목록 조회", description = "특정 상위 카테고리의 하위 카테고리 목록 조회합니다.")
    public ResponseEntity<CategoryHighResponse> getCategoryHigh(@PathVariable Byte categoryHighId) {
        return ResponseEntity.ok(new CategoryHighResponse(categoryService.getCategoryHigh(categoryHighId)));
    }
}