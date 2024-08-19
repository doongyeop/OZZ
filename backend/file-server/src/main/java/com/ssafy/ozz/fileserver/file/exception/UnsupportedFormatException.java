package com.ssafy.ozz.fileserver.file.exception;

import com.ssafy.ozz.fileserver.global.error.ErrorCode;
import com.ssafy.ozz.fileserver.global.error.ServiceException;

public class UnsupportedFormatException extends ServiceException {
    public UnsupportedFormatException() {
        super(ErrorCode.UNSUPPORTED_FORMAT);
    }
}
