package com.ssafy.ozz.auth.auth.controller;

import com.ssafy.ozz.auth.global.domain.Refresh;
import com.ssafy.ozz.auth.global.service.RefreshService;
import com.ssafy.ozz.auth.global.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.ozz.library.config.HeaderConfig.X_USER_ID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JWTUtil jwtUtil;
    private final RefreshService refreshService;

    @PostMapping("/reissue")
    @Operation(summary = "access토큰 재발급, rotate 적용")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        String refresh = request.getHeader("Refresh");

        if (refresh == null) {
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        // 시간 체크
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // 토큰이 refresh인지 확인
        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        String userId = jwtUtil.getUserId(refresh);

        // 리프레시 토큰 검증
        Refresh storedRefreshToken = refreshService.findByRefreshToken(refresh);
        if (storedRefreshToken == null || !storedRefreshToken.getRefreshToken().equals(refresh)) {
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        // 새로운 access + refresh 토큰 발급
        String newAccess = jwtUtil.createJwt("access", Long.parseLong(userId), 600000L);
        String newRefresh = refreshService.createAndSaveRefreshToken(Long.parseLong(userId)); // 1일

        // 기존 리프레시 토큰 삭제
        refreshService.deleteRefreshToken(refresh); // rotate 적용

        // response
        response.setHeader("access", newAccess);
        response.setHeader("refresh", newRefresh);

        return new ResponseEntity<>(HttpStatus.OK);
    }

     @PostMapping("/logout")
     @Operation(summary = "로그아웃")
     public ResponseEntity<?> logout(@Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId) {
         // 리프레시 토큰 삭제
         refreshService.deleteExistingRefreshToken(userId);

         return new ResponseEntity<>("성공적으로 로그아웃 되었습니다.", HttpStatus.OK);
     }
}
