package com.ssafy.ozz.fileserver.file.exception;

import com.ssafy.ozz.fileserver.global.error.ErrorCode;
import com.ssafy.ozz.fileserver.global.error.ServiceException;

public class FileNotFoundException extends ServiceException {
    public FileNotFoundException() {
        super(ErrorCode.FILE_NOT_FOUND);
    }

    public FileNotFoundException(Exception e) {
        super(ErrorCode.FILE_NOT_FOUND, e);
    }
}
