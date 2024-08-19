package com.ssafy.ozz.favorite.service;

import com.ssafy.ozz.favorite.domain.Favorite;
import com.ssafy.ozz.favorite.domain.FavoriteGroup;
import com.ssafy.ozz.favorite.dto.request.FavoriteGroupCreateRequest;
import com.ssafy.ozz.favorite.dto.request.FavoriteListDeleteRequest;
import com.ssafy.ozz.favorite.dto.response.FavoriteGroupBasicResponse;
import com.ssafy.ozz.favorite.dto.response.FavoriteGroupImageResponse;
import com.ssafy.ozz.favorite.dto.response.FavoriteResponse;

import java.util.List;

public interface FavoriteService {
    FavoriteResponse addFavorite(Long favoriteGroupId, Long coordinateId);
    void deleteFavorite(Long favoriteGroupId, Long coordinateId);
    void deleteFavoriteList(Long favoriteGroupId, FavoriteListDeleteRequest request);
    void deleteFavoriteGroup(Long favoriteGroupId);
    List<Favorite> getFavoritesByGroup(Long favoriteGroupId);
    List<FavoriteResponse> getFavoriteResponseListByGroup(Long favoriteGroupId);
    List<FavoriteGroupImageResponse> getFavoriteGroupResponseListOfUser(Long userId);
    FavoriteGroup createFavoriteGroup(FavoriteGroup favoriteGroup);
    FavoriteGroupBasicResponse createFavoriteGroup(Long userId, FavoriteGroupCreateRequest request);
}
