package com.ssafy.ozz.fileserver.file.exception;

import com.ssafy.ozz.fileserver.global.error.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class FileExceptionHandler {

    @ExceptionHandler(value = UnsupportedFormatException.class)
    protected ResponseEntity<String> handle(UnsupportedFormatException e){
        log.error(e.getMessage());
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity.status(errorCode.getHttpStatus()).body(errorCode.getMessage());
    }
}
