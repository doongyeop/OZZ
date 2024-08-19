package com.ssafy.ozz.board.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder(toBuilder = true)
@Schema(description = "태그 정보")
public record TagDto(
        Long clothesId,
        double xPosition,
        double yPosition
) {
}
