package com.ssafy.ozz.gateway.filter;

import com.ssafy.ozz.gateway.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class G1Filter implements GlobalFilter, Ordered {

    private final JWTUtil jwtUtil;

    private static final String[] PERMISSION_PATHS = {"/login", "/oauth2", "/docs", "/v3/api-docs", "/swagger"};

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();
        String path = request.getPath().toString();

        // 경로가 허용된 경우
        for (String permission : PERMISSION_PATHS) {
            if (path.startsWith(permission)) {
                return chain.filter(exchange);
            }
        }

        // Authorization 헤더에서 토큰 추출
        HttpHeaders headers = request.getHeaders();
        String token = headers.getFirst(HttpHeaders.AUTHORIZATION);

        if (token == null || !token.startsWith("Bearer ")) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        token = token.substring(7); // "Bearer " 제거
        String userId;
        try {
            userId = jwtUtil.getUserId(token);
            // JWT 유효성 검사
            if (jwtUtil.isExpired(token)) {
                response.setStatusCode(HttpStatus.UNAUTHORIZED);
                return response.setComplete();
            }
        } catch (Exception e) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        // 사용자 ID가 유효하지 않으면 인가 거부
        if (userId == null) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        // Gateway에서 전달한 사용자 ID와 JWT에서 추출한 사용자 ID가 일치하는지 확인
        String gatewayUserId = headers.getFirst("X-User-Id");

        if (gatewayUserId != null && !gatewayUserId.equals(userId)) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }

        // 사용자 ID를 다른 서비스로 전달, 헤더에 추가
        ServerWebExchange modifiedExchange = exchange.mutate().request(r -> r.header("X-User-Id", userId)).build();

        return chain.filter(modifiedExchange);
    }

    @Override
    public int getOrder() {
        return -1; // 이 필터가 `LoggingGlobalFilter`보다 나중에 실행되도록 설정
    }
}
