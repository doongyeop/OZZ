package com.ssafy.ozz.user.global.file.exception;

import com.ssafy.ozz.user.global.error.ErrorCode;
import com.ssafy.ozz.user.global.error.ServiceException;

public class FileNotFoundException extends ServiceException {
    public FileNotFoundException() {
        super(ErrorCode.FILE_NOT_FOUND);
    }
}
