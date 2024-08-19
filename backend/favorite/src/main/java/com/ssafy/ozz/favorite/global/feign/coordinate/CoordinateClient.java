package com.ssafy.ozz.favorite.global.feign.coordinate;

import com.ssafy.ozz.favorite.global.config.FeignSupportConfig;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@FeignClient(name = "ozz-clothes", path = "/api/coordinates", configuration = FeignSupportConfig.class)
public interface CoordinateClient {
    @GetMapping("/users")
    Optional<Slice<CoordinateBasicResponse>> getCoordinateList(@Parameter(hidden = true) @RequestHeader("X-User-Id") Long userId, @RequestParam Long favoriteGroupId, Pageable pageable);

    @GetMapping("/{coordinateId}/basic")
    Optional<CoordinateBasicResponse> getCoordinate(@PathVariable final Long coordinateId);
}