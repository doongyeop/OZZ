package com.ssafy.ozz.board.service;


public interface BoardLikesService {
    boolean toggleLike(Long boardId, Long userId);

    void updateLikesCount(Long boardId);


}
