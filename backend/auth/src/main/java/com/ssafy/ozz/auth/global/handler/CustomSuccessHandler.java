package com.ssafy.ozz.auth.global.handler;

import com.ssafy.ozz.auth.auth.service.CustomOAuth2User;
import com.ssafy.ozz.auth.global.service.RefreshService;
import com.ssafy.ozz.auth.global.util.JWTUtil;
import com.ssafy.ozz.auth.user.domain.User;
import com.ssafy.ozz.auth.user.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final RefreshService refreshService;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();
        Long userId = customUserDetails.getId();

        // 유저 ID로 토큰 생성
        String access = jwtUtil.createJwt("access", userId, 60000000L); // User ID로 JWT 생성
        String refresh = refreshService.createAndSaveRefreshToken(userId);

        response.setHeader("access", access);
        response.setHeader("refresh", refresh);

        Cookie accessCookie = new Cookie("access", access);
        accessCookie.setPath("/");
//        accessCookie.setHttpOnly(true); 클라이언트에서 접근 못하게
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refresh", refresh);
        refreshCookie.setPath("/");
//        refreshCookie.setHttpOnly(true);
        response.addCookie(refreshCookie);

        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            if (existingUser.get().getNickname() == null) { // 최초 로그인 한 사람이면 닉네임 변경 페이지로 이동
                response.sendRedirect("https://i11a804.p.ssafy.io/login/signup");
//                response.sendRedirect("http://localhost:3000/login/signup");
                return;
            }
        }
        response.sendRedirect("https://i11a804.p.ssafy.io/");
//        response.sendRedirect("http://localhost:3000/");

    }
}