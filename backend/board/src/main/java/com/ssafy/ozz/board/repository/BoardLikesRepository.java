package com.ssafy.ozz.board.repository;

import com.ssafy.ozz.board.domain.BoardLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardLikesRepository extends JpaRepository<BoardLikes, BoardLikes.BoardLikesId> {

    int countByBoard_Id(Long boardId);

    Optional<BoardLikes> findByBoard_IdAndUserId(Long boardId, Long userId);

}
