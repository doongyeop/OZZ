package com.ssafy.ozz.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;

@Schema(description = "유저 정보 수정 요청 DTO")
public record UserUpdateRequest(
        Date birth,
        String nickname
) {
}
