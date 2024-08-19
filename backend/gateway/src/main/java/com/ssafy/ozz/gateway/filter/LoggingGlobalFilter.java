package com.ssafy.ozz.gateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.ServerWebExchangeDecorator;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class LoggingGlobalFilter implements GlobalFilter, Ordered {

//    @Override
//    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
//        // DataBufferFactory를 사용하여 DataBuffer를 생성합니다.
//        ServerHttpResponse response = exchange.getResponse();
//        ServerHttpRequest request = exchange.getRequest();
//
//        // 요청 본문을 읽어오는 부분
//        return request.getBody()
//                .collectList() // 모든 DataBuffer를 리스트로 모은다.
//                .flatMap(dataBuffers -> {
//                    // 본문을 String으로 변환
//                    String requestBody = dataBuffers.stream()
//                            .map(buffer -> {
//                                byte[] bytes = new byte[buffer.readableByteCount()];
//                                buffer.read(bytes);
//                                return new String(bytes, StandardCharsets.UTF_8);
//                            })
//                            .reduce("", String::concat);
//
//                    // 요청 로그 기록
//                    log.info("요청 URL: {}", request.getURI());
//                    log.info("요청 메서드: {}", request.getMethod());
//                    log.info("요청 헤더: {}", request.getHeaders());
//                    log.info("요청 본문: {}", requestBody);
//
//                    // 요청 본문을 다시 설정하는 작업
//                    ServerHttpRequest modifiedRequest = exchange.getRequest().mutate()
//                            .header(HttpHeaders.CONTENT_LENGTH, String.valueOf(requestBody.length()))
//                            .build();
//
//                    // 다시 설정한 요청 본문을 사용하여 ServerWebExchange를 재생성
//                    ServerWebExchange modifiedExchange = new ServerWebExchangeDecorator(exchange) {
//                        @Override
//                        public ServerHttpRequest getRequest() {
//                            return modifiedRequest;
//                        }
//
//                        @Override
//                        public ServerHttpResponse getResponse() {
//                            return exchange.getResponse();
//                        }
//                    };
//
//                    // 재구성된 요청으로 필터 체인에 전달
//                    return chain.filter(modifiedExchange);
//                }).doFinally(signalType -> {
//                    // 응답 로그 기록
//                    log.info("응답 상태 코드: {}", response.getStatusCode());
//                    log.info("응답 헤더: {}", response.getHeaders());
//                });
//    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();

        // 요청 로그 기록
        log.info("요청 URL: {}", request.getURI());
        log.info("요청 메서드: {}", request.getMethod());
        log.info("요청 헤더: {}", request.getHeaders());

        return chain.filter(exchange).doFinally(signalType -> {
            // 응답 로그 기록
            log.info("응답 상태 코드: {}", response.getStatusCode());
            log.info("응답 헤더: {}", response.getHeaders());
        });
    }

    @Override
    public int getOrder() {
        return -2; // 이 필터가 다른 필터들보다 먼저 실행되도록 설정
    }
}
