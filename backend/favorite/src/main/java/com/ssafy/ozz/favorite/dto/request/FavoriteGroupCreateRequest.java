package com.ssafy.ozz.favorite.dto.request;

import com.ssafy.ozz.favorite.domain.FavoriteGroup;

public record FavoriteGroupCreateRequest(
        String name
){
    public FavoriteGroup toEntity(Long userId) {
        return FavoriteGroup.builder()
                .name(name)
                .userId(userId)
                .build();
    }
}
