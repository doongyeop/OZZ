package com.ssafy.ozz.board.service;

import com.ssafy.ozz.board.domain.Board;
import com.ssafy.ozz.board.domain.BoardLikes;
import com.ssafy.ozz.board.domain.Notification;
import com.ssafy.ozz.board.global.feign.user.UserClient;
import com.ssafy.ozz.board.repository.BoardLikesRepository;
import com.ssafy.ozz.board.repository.BoardRepository;
import com.ssafy.ozz.board.repository.NotificationRepository;
import com.ssafy.ozz.library.global.error.exception.BoardNotFoundException;
import com.ssafy.ozz.library.global.error.exception.UserNotFoundException;
import com.ssafy.ozz.library.user.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardLikesServiceImpl implements BoardLikesService {

    private final BoardRepository boardRepository;
    private final BoardLikesRepository boardLikesRepository;
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;
    private final UserClient userClient;

    @Override
    @Transactional
    public boolean toggleLike(Long boardId, Long userId) {

        // 좋아요 취소
        Optional<BoardLikes> existingLike = boardLikesRepository.findByBoard_IdAndUserId(boardId, userId);
        if (existingLike.isPresent()) {
            boardLikesRepository.delete(existingLike.get());

            // 좋아요 취소 시 해당 알림을 찾아 삭제
            Optional<Notification> existingNotification = notificationRepository.findByBoardIdAndUserId(boardId, userId);
            existingNotification.ifPresent(notification -> {
                notificationService.deleteNotificationById(notification.getId());
            });

            // 좋아요 수 업데이트
            updateLikesCount(boardId);

            return false;
        }

        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        BoardLikes newBoardLike = BoardLikes.builder()
                .board(board)
                .userId(userId)
                .build();
        boardLikesRepository.save(newBoardLike);

        // 알림 생성
        UserInfo userInfo = userClient.getUserInfo(userId).orElseThrow(UserNotFoundException::new);
        Notification notification = Notification.builder()
                .board(board)
                .userId(board.getUserId())
                .read(false)
                .content(userInfo.nickname() + "님이 내 게시글을 마음에 들어합니다.")
                .build();
        notificationRepository.save(notification);

        // 좋아요 수 업데이트
        updateLikesCount(boardId);

        return true;
    }

    @Override
    public void updateLikesCount(Long boardId) {
        int likesCount = boardLikesRepository.countByBoard_Id(boardId);
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        board = board.toBuilder()
                .likes(likesCount)
                .build();
        boardRepository.save(board);
    }
}
