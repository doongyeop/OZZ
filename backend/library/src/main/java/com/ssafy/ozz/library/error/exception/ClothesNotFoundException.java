package com.ssafy.ozz.library.error.exception;

import com.ssafy.ozz.library.error.ErrorCode;
import com.ssafy.ozz.library.error.ServiceException;

public class ClothesNotFoundException extends ServiceException {
    public ClothesNotFoundException() {
        super(ErrorCode.CLOTHES_NOT_FOUND);
    }
}
