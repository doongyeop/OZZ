package com.ssafy.ozz.user.global.auth;

import com.ssafy.ozz.user.global.config.FeignSupportConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ozz-auth", path = "/api/auth", configuration = FeignSupportConfig.class)
public interface AuthClient {

    @DeleteMapping("/users/{userId}/refresh")
    ResponseEntity<Void> deleteRefreshTokenOfUser(@PathVariable Long userId);
}
