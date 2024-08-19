package com.ssafy.ozz.library.global.error.exception;

import com.ssafy.ozz.library.global.error.ErrorCode;
import com.ssafy.ozz.library.global.error.ServiceException;

public class ClothesNotFoundException extends ServiceException {
    public ClothesNotFoundException() {
        super(ErrorCode.CLOTHES_NOT_FOUND);
    }
}
