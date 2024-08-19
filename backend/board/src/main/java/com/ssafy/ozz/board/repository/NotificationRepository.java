package com.ssafy.ozz.board.repository;

import com.ssafy.ozz.board.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByUserId(Long userId);

    List<Notification> findByBoardId(Long boardId);

    Optional<Notification> findByBoardIdAndUserId(Long boardId, Long userId);

    void deleteByUserId(Long userId);

}
