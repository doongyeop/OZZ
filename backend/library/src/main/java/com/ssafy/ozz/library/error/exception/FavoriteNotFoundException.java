package com.ssafy.ozz.library.error.exception;

import com.ssafy.ozz.library.error.ErrorCode;
import com.ssafy.ozz.library.error.ServiceException;

public class FavoriteNotFoundException extends ServiceException {
    public FavoriteNotFoundException() {
        super(ErrorCode.FAVORITE_NOT_FOUND);
    }
}
