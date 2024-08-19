package com.ssafy.ozz.clothes.category.service;

import com.ssafy.ozz.clothes.category.domain.CategoryHigh;
import com.ssafy.ozz.clothes.category.domain.CategoryLow;
import com.ssafy.ozz.clothes.category.repository.CategoryHighRepository;
import com.ssafy.ozz.clothes.category.repository.CategoryLowRepository;
import com.ssafy.ozz.library.error.exception.CategoryNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryHighRepository categoryHighRepository;
    private final CategoryLowRepository categoryLowRepository;

    @Override
    public CategoryHigh getCategoryHigh(Byte categoryHighId) {
        return categoryHighRepository.findById(categoryHighId).orElseThrow(CategoryNotFoundException::new);
    }

    @Override
    public List<CategoryHigh> getAllCategoryHigh() {
        return categoryHighRepository.findAll();
    }

    @Override
    public CategoryLow getCategoryLow(Byte categoryLowId) {
        if(categoryLowId == null) return null;
        return categoryLowRepository.findById(categoryLowId).orElseThrow(CategoryNotFoundException::new);
    }
}
