package com.ssafy.ozz.fileserver.global.error;

import lombok.Getter;

@Getter
public class ServiceException extends RuntimeException {
    private final ErrorCode errorCode;

    public ServiceException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ServiceException(ErrorCode errorCode, Exception e) {
        super(errorCode.getMessage(), e);
        this.errorCode = errorCode;
    }
}