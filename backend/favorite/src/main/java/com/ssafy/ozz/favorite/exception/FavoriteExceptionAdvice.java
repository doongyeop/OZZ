package com.ssafy.ozz.favorite.exception;

import com.ssafy.ozz.library.error.ErrorCode;
import com.ssafy.ozz.library.error.ServiceException;
import feign.FeignException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class FavoriteExceptionAdvice {
    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<String> handleSerialException(final ServiceException e) {
        ErrorCode errorCode = e.getErrorCode();
        return ResponseEntity.status(errorCode.getHttpStatus())
                .body(errorCode.getMessage());
    }
    @ExceptionHandler(FeignException.class)
    public ResponseEntity<String> handleSerialException(final FeignException e) {
        return ResponseEntity.status(e.status())
                .body(e.getMessage());
    }
}
