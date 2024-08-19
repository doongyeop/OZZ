package com.ssafy.ozz.board.controller;

import com.ssafy.ozz.board.domain.Notification;
import com.ssafy.ozz.board.dto.response.NotificationResponse;
import com.ssafy.ozz.board.dto.response.UserResponse;
import com.ssafy.ozz.board.global.feign.file.FileClient;
import com.ssafy.ozz.board.global.feign.user.UserClient;
import com.ssafy.ozz.board.service.NotificationService;
import com.ssafy.ozz.library.error.exception.FileNotFoundException;
import com.ssafy.ozz.library.error.exception.UserNotFoundException;
import com.ssafy.ozz.library.file.FileInfo;
import com.ssafy.ozz.library.user.UserInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.ozz.library.config.HeaderConfig.X_USER_ID;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Tag(name = "NotificationController", description = "알림 컨트롤러")
public class NotificationController {

    private final NotificationService notificationService;
    private final FileClient fileClient;
    private final UserClient userClient;

    @DeleteMapping("/{notificationId}")
    @Operation(summary = "알림 삭제", description = "알림을 삭제합니다.")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotificationById(notificationId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{notificationId}")
    @Operation(summary = "알림 읽음 처리", description = "알림을 읽음처리 합니다.")
    public ResponseEntity<Void> readNotification(@PathVariable Long notificationId) {
        notificationService.readNotification(notificationId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user")
    @Operation(summary = "모든 알림 삭제", description = "사용자에게 온 모든 알림을 삭제합니다.")
    public ResponseEntity<Void> deleteAllNotifications(@Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId) {
        notificationService.deleteAllNotifications(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/")
    @Operation(summary = "모든 알림 조회", description = "특정 사용자의 모든 알림을 조회합니다.")
    public ResponseEntity<List<NotificationResponse>> getAllNotificationsByUserId(@Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId) {
        List<Notification> notificationList = notificationService.getAllNotificationsByUserId(userId);
        List<NotificationResponse> responseList = new ArrayList<>();

        for (Notification notification : notificationList) {
            UserInfo userInfo = userClient.getUserInfo(notification.getUserId()).orElseThrow(UserNotFoundException::new);
            FileInfo profileImg = fileClient.getFile(userInfo.profileFileId()).orElseThrow(FileNotFoundException::new);
            FileInfo boardImg = fileClient.getFile(notification.getBoard().getImgFileId()).orElseThrow(FileNotFoundException::new);

            UserResponse userResponse = new UserResponse(
                    userInfo.userId(),
                    userInfo.nickname(),
                    userInfo.profileFileId(),
                    userInfo.Birth(),
                    profileImg
            );

            NotificationResponse response = new NotificationResponse(
                    notification.getId(),
                    notification.getContent(),
                    userResponse,
                    boardImg
            );

            responseList.add(response);
        }

        return ResponseEntity.ok(responseList);
    }

}
