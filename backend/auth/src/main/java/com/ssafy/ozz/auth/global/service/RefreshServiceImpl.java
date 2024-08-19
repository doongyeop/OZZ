package com.ssafy.ozz.auth.global.service;

import com.ssafy.ozz.auth.global.domain.Refresh;
import com.ssafy.ozz.auth.global.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RefreshServiceImpl implements RefreshService {

    private final JWTUtil jwtUtil;
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public String createAndSaveRefreshToken(Long userId) {
        String refreshToken = jwtUtil.createJwt("refresh", userId, 86400000L); // 1일
        saveRefreshToken(refreshToken);
        return refreshToken;
    }

    @Override
    public void saveRefreshToken(String refreshToken) {
        // 사용자 ID를 추출
        String userId = jwtUtil.getUserId(refreshToken);

        // 기존 리프레시 토큰이 있으면 삭제
        String existingTokenKey = findExistingRefreshTokenKey(userId);
        if (existingTokenKey != null) {
            redisTemplate.delete(existingTokenKey);
        }

        // 새로운 리프레시 토큰 저장
        Refresh refresh = Refresh.builder()
                .id(userId)
                .refreshToken(refreshToken)
                .expiration(new Date(System.currentTimeMillis() + 86400000L))
                .build();

        // RedisTemplate을 사용하여 해시 타입으로 저장
        Map<String, Object> hash = new HashMap<>();
        hash.put("userId", userId);
        hash.put("refreshToken", refresh.getRefreshToken());
        hash.put("expiration", refresh.getExpiration().getTime());
        redisTemplate.opsForHash().putAll(userId, hash);

        redisTemplate.expire(userId, 86400, TimeUnit.SECONDS); // TTL 1일 설정
    }

    @Override
    public void deleteRefreshToken(String refreshToken) {
        String existingTokenKey = findExistingRefreshTokenKeyByToken(refreshToken);
        if (existingTokenKey != null) {
            redisTemplate.delete(existingTokenKey);
        }
    }

    @Override
    public void deleteExistingRefreshToken(Long userId) {
        String existingTokenKey = findExistingRefreshTokenKey(String.valueOf(userId));
        if (existingTokenKey != null) {
            redisTemplate.delete(existingTokenKey);
        }
    }

    @Override
    public Refresh findByRefreshToken(String refreshToken) {
        String existingTokenKey = findExistingRefreshTokenKeyByToken(refreshToken);
        if (existingTokenKey != null) {
            Map<Object, Object> hash = redisTemplate.opsForHash().entries(existingTokenKey);
            if (!hash.isEmpty()) {
                return Refresh.builder()
                        .id((String) hash.get("userId"))
                        .refreshToken((String) hash.get("refreshToken"))
                        .expiration(new Date((Long) hash.get("expiration")))
                        .build();
            }
        }
        return null;
    }
    // key로 리프레쉬 토큰 조회
    private String findExistingRefreshTokenKey(String userId) {
        for (String key : redisTemplate.keys("refreshToken:*")) {
            Map<Object, Object> hash = redisTemplate.opsForHash().entries(key);
            String tokenUserId = jwtUtil.getUserId((String) hash.get("refreshToken"));
            if (userId.equals(tokenUserId)) {
                return key;
            }
        }
        return null;
    }
    // 토큰으로 리프레쉬 토큰 조회
    private String findExistingRefreshTokenKeyByToken(String refreshToken) {
        for (String key : redisTemplate.keys("refreshToken:*")) {
            Map<Object, Object> hash = redisTemplate.opsForHash().entries(key);
            if (refreshToken.equals(hash.get("refreshToken"))) {
                return key;
            }
        }
        return null;
    }
}