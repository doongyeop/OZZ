package com.ssafy.ozz.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;

@Schema(description = "유저 정보 응답 DTO")
public record UserUpdateResponse(
        Long id,
        String nickname,
        Date birth
) {
}
