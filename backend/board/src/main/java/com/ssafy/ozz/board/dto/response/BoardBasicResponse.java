package com.ssafy.ozz.board.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.ozz.board.domain.Board;
import com.ssafy.ozz.library.file.FileInfo;
import io.swagger.v3.oas.annotations.media.Schema;

@JsonIgnoreProperties({"boardLikes", "tags"})
@Schema(description = "게시글 상세 정보 DTO with 파일 및 사용자 정보")
public record BoardBasicResponse(
        Long boardId,
        Long userId,
        Long coordinateId,
        String content,
        int likes,
        FileInfo boardFileInfo// = coordinateFileInfo
) {
    public BoardBasicResponse(Board board, FileInfo boardFileInfo) {
        this(
                board.getId(),
                board.getUserId(),
                board.getCoordinateId(),
                board.getContent(),
                board.getLikes(),
                boardFileInfo
        );
    }
}
