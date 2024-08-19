package com.ssafy.ozz.library.error.exception;

import com.ssafy.ozz.library.error.ErrorCode;
import com.ssafy.ozz.library.error.ServiceException;

public class FileNotFoundException extends ServiceException {
    public FileNotFoundException() {
        super(ErrorCode.FILE_NOT_FOUND);
    }
}
