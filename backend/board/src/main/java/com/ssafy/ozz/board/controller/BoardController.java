package com.ssafy.ozz.board.controller;

import com.ssafy.ozz.board.domain.Board;
import com.ssafy.ozz.board.dto.request.BoardCreateRequest;
import com.ssafy.ozz.board.dto.request.BoardUpdateRequest;
import com.ssafy.ozz.board.dto.response.BoardBasicResponse;
import com.ssafy.ozz.board.dto.response.BoardResponse;
import com.ssafy.ozz.board.global.feign.file.FileClient;
import com.ssafy.ozz.board.service.BoardService;
import com.ssafy.ozz.library.error.exception.BoardNotFoundException;
import com.ssafy.ozz.library.file.FileInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import static com.ssafy.ozz.library.config.HeaderConfig.X_USER_ID;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@Tag(name = "BoardController", description = "게시글 API")
public class BoardController {

    private final BoardService boardService;
    private final FileClient fileClient;

    // O
    @PostMapping("/")
    @Operation(summary = "게시글 등록")
    public ResponseEntity<Long> createBoard(
            @RequestBody BoardCreateRequest request) {
        Long userId = request.userId();
        Long imgFileId = request.imgFileId();
        Board board = boardService.createBoard(userId, imgFileId, request);

        return ResponseEntity.status(201).body(board.getId());
    }

    // O
    @GetMapping("/user")
    @Operation(summary = "유저ID로 작성 글 조회", description = "특정 사용자가 작성한 글을 조회합니다.")
    public ResponseEntity<Page<BoardBasicResponse>> getBoardsByUserId(
            @Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId, Pageable pageable) {
        Page<Board> boards = boardService.getBoardsByUserId(userId, pageable);
        Page<BoardBasicResponse> boardBasicResponses = boards.map(board -> {
            FileInfo boardImg = fileClient.getFile(board.getImgFileId()).orElseThrow(BoardNotFoundException::new);
            return new BoardBasicResponse(board, boardImg);
        });
        return ResponseEntity.ok(boardBasicResponses);
    }

    // O
    @GetMapping("/")
    @Operation(summary = "모든 게시글 조회", description = "모든 게시글을 조회합니다.")
    public ResponseEntity<Page<BoardBasicResponse>> getBoards(Pageable pageable) {
        Page<Board> boards = boardService.getBoards(pageable);

        Page<BoardBasicResponse> boardBasicResponses = boards.map(board -> {
            FileInfo boardImg = fileClient.getFile(board.getImgFileId()).orElseThrow(BoardNotFoundException::new);
            return new BoardBasicResponse(board, boardImg);
        });

        return ResponseEntity.ok(boardBasicResponses);
    }

    @GetMapping("/{boardId}")
    @Operation(summary = "게시글 상세 조회", description = "게시글을 상세 조회합니다.")
    public ResponseEntity<BoardResponse> getBoard(@PathVariable("boardId") Long boardId) {
        BoardResponse boardResponse = boardService.getBoard(boardId);
        return ResponseEntity.ok(boardResponse);
    }

    // O
    @GetMapping("/sort/age")
    @Operation(summary = "나이별 게시글 조회", description = "특정 나이대의 게시글을 필터링하여 조회합니다.")
    public ResponseEntity<Page<BoardBasicResponse>> getBoardsByAgeRange(
            @RequestParam int age, Pageable pageable) {
        int startAge = age < 10 ? 0 : age / 10 * 10;
        int endAge = startAge + 9;

        Page<Board> boards = boardService.getBoardsByAgeRange(pageable, startAge, endAge);
        Page<BoardBasicResponse> boardBasicResponses = boards.map(board -> {
            FileInfo boardImg = fileClient.getFile(board.getImgFileId()).orElseThrow(BoardNotFoundException::new);
            return new BoardBasicResponse(board, boardImg);
        });

        return ResponseEntity.ok(boardBasicResponses);
    }
    // O
    @GetMapping("/sort/style")
    @Operation(summary = "스타일별 게시글 조회", description = "특정 스타일의 게시글을 필터링하여 조회합니다.")
    public ResponseEntity<Page<BoardBasicResponse>> getBoardsByStyle(
            @RequestParam("style") String style, Pageable pageable) {

        Page<Board> boards = boardService.getBoardsByStyle(pageable, style);
        Page<BoardBasicResponse> boardBasicResponses = boards.map(board -> {
            FileInfo boardImg = fileClient.getFile(board.getImgFileId()).orElseThrow(BoardNotFoundException::new);
            return new BoardBasicResponse(board, boardImg);
        });

        return ResponseEntity.ok(boardBasicResponses);
    }
    // O
    @GetMapping("/sort/likes")
    @Operation(summary = "좋아요 순으로 게시글 조회", description = "최근 하루 동안의 좋아요 순으로 게시글을 조회합니다.")
    public ResponseEntity<Page<BoardBasicResponse>> getBoardsSortedByLikesInLastDay(Pageable pageable) {
        Page<Board> boards = boardService.getBoardsSortedByLikesInOneDay(pageable);
        Page<BoardBasicResponse> boardBasicResponses = boards.map(board -> {
            FileInfo boardImg = fileClient.getFile(board.getImgFileId()).orElseThrow(BoardNotFoundException::new);
            return new BoardBasicResponse(board, boardImg);
        });

        return ResponseEntity.ok(boardBasicResponses);
    }

    // O
    @PutMapping("/{boardId}")
    @Operation(summary = "게시글 수정", description = "게시글을 수정합니다.")
    public ResponseEntity<?> updateBoard(
            @PathVariable Long boardId,
            @RequestBody BoardUpdateRequest request) {
        Long imgFileId = request.imgFileId();
        boardService.updateBoard(boardId, request, imgFileId);
        return ResponseEntity.ok().build();
    }

    // O
    @DeleteMapping("/{boardId}")
    @Operation(summary = "게시글 삭제", description = "게시글을 삭제합니다.")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) {
        boardService.deleteBoard(boardId);
        return ResponseEntity.noContent().build();
    }

//    @PostMapping("/get/{coordinateId}")
//    @Operation(summary = "게시글에서 코디가져오기", description = "게시글의 코디를 내 코디북으로 가져옵니다.")
//    public ResponseEntity<Boolean> getCoordinate(@PathVariable Long coordinateId) {
//        if (existing) {
//            delete
//            return ResponseEntity.ok(false);
//        }
//        save
//        return ResponseEntity.ok(true);
//    }

}

