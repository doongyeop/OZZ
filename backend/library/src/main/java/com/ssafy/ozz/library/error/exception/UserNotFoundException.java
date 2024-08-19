package com.ssafy.ozz.library.error.exception;

import com.ssafy.ozz.library.global.error.ErrorCode;
import com.ssafy.ozz.library.global.error.ServiceException;

public class UserNotFoundException extends ServiceException {
    public UserNotFoundException() {
        super(ErrorCode.USER_NOT_FOUND);
    }
}