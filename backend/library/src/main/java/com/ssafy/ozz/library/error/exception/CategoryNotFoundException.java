package com.ssafy.ozz.library.error.exception;

import com.ssafy.ozz.library.error.ErrorCode;
import com.ssafy.ozz.library.error.ServiceException;

public class CategoryNotFoundException extends ServiceException {
    public CategoryNotFoundException() {
        super(ErrorCode.CATEGORY_NOT_FOUND);
    }
}
