package com.ssafy.ozz.library.error.exception;

import com.ssafy.ozz.library.error.ErrorCode;
import com.ssafy.ozz.library.error.ServiceException;

public class FavoriteDuplicatedException extends ServiceException {
    public FavoriteDuplicatedException() {
        super(ErrorCode.FAVORITE_DUPLICATED);
    }
}
