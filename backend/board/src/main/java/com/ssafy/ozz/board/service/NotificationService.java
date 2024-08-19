package com.ssafy.ozz.board.service;

import com.ssafy.ozz.board.domain.Notification;

import java.util.List;

public interface NotificationService {

    List<Notification> getAllNotificationsByUserId(Long userId);

    void readNotification(Long notificationId);

    void deleteNotificationById(Long notificationId);

    void deleteAllNotifications(Long useId);
}
