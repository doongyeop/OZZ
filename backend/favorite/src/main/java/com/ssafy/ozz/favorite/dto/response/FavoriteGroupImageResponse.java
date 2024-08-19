package com.ssafy.ozz.favorite.dto.response;

import com.ssafy.ozz.favorite.domain.FavoriteGroup;
import com.ssafy.ozz.library.file.FileInfo;
import lombok.Builder;

import java.util.List;

@Builder
public record FavoriteGroupImageResponse (
        Long favoriteGroupId,
        String name,
        List<FileInfo> imageFileList
){
    public static FavoriteGroupImageResponse of(FavoriteGroup favoriteGroup, List<FileInfo> imageFileList) {
        return FavoriteGroupImageResponse.builder()
                .favoriteGroupId(favoriteGroup.getId())
                .name(favoriteGroup.getName())
                .imageFileList(imageFileList)
                .build();
    }
}
