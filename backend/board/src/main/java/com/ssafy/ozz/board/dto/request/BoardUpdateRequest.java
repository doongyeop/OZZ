package com.ssafy.ozz.board.dto.request;

import com.ssafy.ozz.board.domain.Board;
import com.ssafy.ozz.board.domain.Tag;
import com.ssafy.ozz.library.clothes.properties.Style;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.fromStrings;
import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toBits;

@Schema(description = "게시글 수정 요청 DTO")
public record BoardUpdateRequest(
        String content,
        Long imgFileId,
        Long coordinateId,
        List<String> styleList,
        List<TagDto> tagList
) {
    public Board toEntity(Board existingBoard) {
        List<Style> styles = fromStrings(Style.class, styleList);

        final Board updatedBoard = existingBoard.toBuilder()
                .content(content)
                .imgFileId(imgFileId)
                .coordinateId(coordinateId)
                .style(toBits(styles))
                .build();

        if (tagList != null) {
            List<Tag> tags = tagList.stream()
                    .map(tagRequest -> Tag.builder()
                            .clothesId(tagRequest.clothesId())
                            .xPosition(tagRequest.xPosition())
                            .yPosition(tagRequest.yPosition())
                            .board(updatedBoard)
                            .build())
                    .collect(Collectors.toList());
            updatedBoard.getTags().clear();
            updatedBoard.getTags().addAll(tags);
        }

        return updatedBoard;
    }
}
