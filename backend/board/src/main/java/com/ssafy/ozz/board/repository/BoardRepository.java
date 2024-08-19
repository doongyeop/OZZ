package com.ssafy.ozz.board.repository;

import com.ssafy.ozz.board.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findByUserId(Long userId, Pageable pageable);

    Page<Board> findByCreatedDateAfterOrderByLikesDesc(Date date, Pageable pageable);

    Page<Board> findByStyle(Integer style, Pageable pageable);

    Page<Board> findByAgeBetween(int startAge, int endAge, Pageable pageable);

}
