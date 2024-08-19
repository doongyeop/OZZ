package com.ssafy.ozz.library.error.exception;

import com.ssafy.ozz.library.error.ErrorCode;
import com.ssafy.ozz.library.error.ServiceException;

public class CoordinateNotFoundException extends ServiceException {
    public CoordinateNotFoundException() {
        super(ErrorCode.COORDINATE_NOT_FOUND);
    }
}
