package com.ssafy.ozz.clothes.category.service;

import com.ssafy.ozz.clothes.category.domain.CategoryHigh;
import com.ssafy.ozz.clothes.category.domain.CategoryLow;

import java.util.List;

public interface CategoryService {
    CategoryHigh getCategoryHigh(Byte categoryHighId);
    List<CategoryHigh> getAllCategoryHigh();
    CategoryLow getCategoryLow(Byte categoryLowId);
}
