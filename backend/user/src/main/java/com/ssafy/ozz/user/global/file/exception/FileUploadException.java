package com.ssafy.ozz.user.global.file.exception;

import com.ssafy.ozz.user.global.error.ErrorCode;
import com.ssafy.ozz.user.global.error.ServiceException;

public class FileUploadException extends ServiceException {
    public FileUploadException() {
        super(ErrorCode.FILE_UPLOAD_FAILED);
    }
}
