package com.ssafy.ozz.board.dto.request;

import com.ssafy.ozz.board.domain.Board;
import com.ssafy.ozz.board.domain.Tag;
import com.ssafy.ozz.library.clothes.properties.Style;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.fromStrings;
import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toBits;

@Schema(description = "게시글 생성 요청 DTO")
public record BoardCreateRequest(
        String content,
        Long userId, // 작성자
        Long imgFileId, // 코디 사진
        Long coordinateId, // 코디 불러오기 용 코디Id
        int age,
        List<TagDto> tagList,
        List<String> styleList
) {
    public Board toEntity() {
        List<Style> styles = fromStrings(Style.class, styleList);

        Board board = Board.builder()
                .content(content)
                .userId(userId)
                .imgFileId(imgFileId)
                .coordinateId(coordinateId)
                .age(age)
                .likes(0)
                .style(toBits(styles))
                .createdDate(new Date())
                .build();

        if (tagList != null) {
            List<Tag> tags = tagList.stream()
                    .map(tagRequest -> Tag.builder()
                            .clothesId(tagRequest.clothesId())
                            .xPosition(tagRequest.xPosition())
                            .yPosition(tagRequest.yPosition())
                            .board(board)
                            .build())
                    .collect(Collectors.toList());
            board.getTags().addAll(tags);
        }

        return board;
    }
}
