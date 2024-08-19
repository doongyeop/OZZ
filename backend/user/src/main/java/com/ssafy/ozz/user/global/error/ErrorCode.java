package com.ssafy.ozz.user.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    FILE_NOT_FOUND(400, "파일을 찾을 수 없습니다."),
    FILE_UPLOAD_FAILED(400, "파일을 찾을 수 없습니다.");

    private final int httpStatus;
    private final String message;
}
