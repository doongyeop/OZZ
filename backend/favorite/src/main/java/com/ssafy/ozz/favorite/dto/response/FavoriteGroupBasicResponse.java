package com.ssafy.ozz.favorite.dto.response;

import com.ssafy.ozz.favorite.domain.FavoriteGroup;
import lombok.Builder;

@Builder
public record FavoriteGroupBasicResponse(
        Long favoriteGroupId,
        String name
){
    public static FavoriteGroupBasicResponse of(FavoriteGroup favoriteGroup) {
        return FavoriteGroupBasicResponse.builder()
                .favoriteGroupId(favoriteGroup.getId())
                .name(favoriteGroup.getName())
                .build();
    }
}
