package com.ssafy.ozz.fileserver.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INTERNAL_SERVER_ERROR(500, "서버 오류가 발생했습니다."),
    UNSUPPORTED_FORMAT(415, "지원하지 않는 파일 포맷입니다."),
    FILE_NOT_FOUND(400, "파일을 찾을 수 없습니다.");

    private final int httpStatus;
    private final String message;
}
