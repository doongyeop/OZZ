package com.ssafy.ozz.library.error.exception;

import com.ssafy.ozz.library.error.ErrorCode;
import com.ssafy.ozz.library.error.ServiceException;

public class FavoriteGroupNotFoundException extends ServiceException {
    public FavoriteGroupNotFoundException() {
        super(ErrorCode.FAVORITE_GROUP_NOT_FOUND);
    }
}
