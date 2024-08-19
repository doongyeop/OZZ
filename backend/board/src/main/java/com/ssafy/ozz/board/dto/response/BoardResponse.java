package com.ssafy.ozz.board.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.ozz.board.domain.Board;
import com.ssafy.ozz.library.file.FileInfo;
import com.ssafy.ozz.library.clothes.properties.Style;
import com.ssafy.ozz.board.domain.Tag;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toEnums;

@JsonIgnoreProperties({"boardLikes", "tags"})
@Schema(description = "게시글 상세 정보 DTO with 파일 및 사용자 정보")
public record BoardResponse(
        Long boardId,
        Long userId,
        Long coordinateId,
        String content,
        int age,
        int likes,
        List<String> styleList,
        List<Tag> tagList,
        FileInfo boardFileInfo, // = coordinateFileInfo
        UserResponse userInfo,
        Date createdDate
) {
    public BoardResponse(Board board, FileInfo boardFileInfo, UserResponse userInfo) {
        this(
                board.getId(),
                board.getUserId(),
                board.getCoordinateId(),
                board.getContent(),
                board.getAge(),
                board.getLikes(),
                toEnums(Style.class, board.getStyle()).stream()
                        .map(Enum::name)
                        .collect(Collectors.toList()),
                board.getTags(),
                boardFileInfo,
                userInfo,
                board.getCreatedDate()
        );
    }
}
