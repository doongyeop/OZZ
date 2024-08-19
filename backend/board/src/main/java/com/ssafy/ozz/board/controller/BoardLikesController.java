package com.ssafy.ozz.board.controller;


import com.ssafy.ozz.board.repository.BoardRepository;
import com.ssafy.ozz.board.service.BoardLikesService;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import static com.ssafy.ozz.library.config.HeaderConfig.X_USER_ID;

@RestController
@RequestMapping("/api/boardlikes")
@RequiredArgsConstructor
@Tag(name = "boardLikesRestController", description = "게시글 좋아요/취소 컨트롤러")
public class BoardLikesController {

    private final BoardLikesService boardLikesService;
    private final BoardRepository boardRepository;

    @PostMapping("/{boardId}")
    @Operation(summary = "게시글 좋아요/취소", description = "게시글을 좋아요합니다. 이미 좋아요 했다면 취소합니다.")
    public ResponseEntity<?> toggleLike(@PathVariable("boardId") Long boardId, @Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId) {
        return boardRepository.findById(boardId)
                .map(board -> {
                    if (board.getUserId().equals(userId)) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("자신의 게시물엔 좋아요 할 수 없습니다.");
                    }
                    boolean isLiked = boardLikesService.toggleLike(boardId, userId);
                    return ResponseEntity.ok(isLiked);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글을 찾을 수 없습니다."));
    }
}
