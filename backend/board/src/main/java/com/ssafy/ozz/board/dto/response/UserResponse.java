package com.ssafy.ozz.board.dto.response;

import com.ssafy.ozz.library.file.FileInfo;

import java.util.Date;

public record UserResponse(
        Long userId,
        String nickname,
        Long profileFileId,
        Date birth,
        FileInfo profileImg
) {
}
