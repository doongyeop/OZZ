package com.ssafy.ozz.board.global.feign.user;

import com.ssafy.ozz.board.global.config.FeignSupportConfig;
import com.ssafy.ozz.library.user.UserInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Optional;

import static com.ssafy.ozz.library.config.HeaderConfig.X_USER_ID;

@FeignClient(name = "ozz-user", path = "/api/users", configuration = FeignSupportConfig.class)
public interface UserClient {
    @GetMapping("/")
    Optional<UserInfo> getUserInfo(@RequestHeader(X_USER_ID) Long userId);

    @GetMapping("/{userId}")
    Optional<UserInfo> getUserInfoFromId(@PathVariable("userId") Long userId);

}


