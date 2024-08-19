package com.ssafy.ozz.favorite.dto.response;

import com.ssafy.ozz.favorite.domain.Favorite;
import com.ssafy.ozz.favorite.global.feign.coordinate.CoordinateBasicResponse;
import lombok.Builder;

@Builder
public record FavoriteResponse(
        Long favoriteId,
        CoordinateBasicResponse coordinate
) {
    public static FavoriteResponse of(Favorite favorite, CoordinateBasicResponse coordinate) {
        return FavoriteResponse.builder()
                .favoriteId(favorite.getId())
                .coordinate(coordinate)
                .build();
    }
}
