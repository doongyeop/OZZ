package com.ssafy.ozz.board.dto.response;

import com.ssafy.ozz.library.file.FileInfo;

public record NotificationResponse(
        Long boardId,
        String message,
        UserResponse userResponse,
        FileInfo boardImg
) {
}
