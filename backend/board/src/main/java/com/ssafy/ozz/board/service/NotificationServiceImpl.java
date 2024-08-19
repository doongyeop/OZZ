package com.ssafy.ozz.board.service;

import com.ssafy.ozz.board.domain.Notification;
import com.ssafy.ozz.board.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<Notification> getAllNotificationsByUserId(Long userId) {
        return notificationRepository.findAllByUserId(userId);
    }

    @Override
    public void readNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        notification = notification.toBuilder()
                .read(true)
                .build();
        notificationRepository.save(notification);
    }

    @Override
    public void deleteNotificationById(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    @Override
    public void deleteAllNotifications(Long userId) {
        notificationRepository.deleteByUserId(userId);
    }
}
