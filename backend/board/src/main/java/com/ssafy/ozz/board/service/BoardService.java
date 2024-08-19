package com.ssafy.ozz.board.service;

import com.ssafy.ozz.board.domain.Board;
import com.ssafy.ozz.board.dto.request.BoardCreateRequest;
import com.ssafy.ozz.board.dto.request.BoardUpdateRequest;
import com.ssafy.ozz.board.dto.response.BoardResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardService {
    Board createBoard(Long userId, Long imgFileId, BoardCreateRequest request);

    Page<Board> getBoardsByUserId(Long userId, Pageable pageable);

    Page<Board> getBoards(Pageable pageable);

    void updateBoard(Long boardId, BoardUpdateRequest request, Long imgFileId);

    void deleteBoard(Long boardId);

    Page<Board> getBoardsByStyle(Pageable pageable, String style);

    Page<Board> getBoardsByAgeRange(Pageable pageable, int startAge, int endAge);

    Page<Board> getBoardsSortedByLikesInOneDay(Pageable pageable);

    BoardResponse getBoard(Long boardId);
}
