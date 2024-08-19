package com.ssafy.ozz.library.error.exception;

import com.ssafy.ozz.library.error.ErrorCode;
import com.ssafy.ozz.library.error.ServiceException;

public class BoardNotFoundException extends ServiceException {
    public BoardNotFoundException() {
        super(ErrorCode.BOARD_NOT_FOUND);
    }
}
