package com.ssafy.ozz.library.global.error.exception;

import com.ssafy.ozz.library.global.error.ErrorCode;
import com.ssafy.ozz.library.global.error.ServiceException;

public class BoardNotFoundException extends ServiceException {
    public BoardNotFoundException() {
        super(ErrorCode.BOARD_NOT_FOUND);
    }
}
