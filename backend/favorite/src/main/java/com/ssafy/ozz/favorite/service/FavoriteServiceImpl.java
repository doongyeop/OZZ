package com.ssafy.ozz.favorite.service;

import com.ssafy.ozz.favorite.domain.Favorite;
import com.ssafy.ozz.favorite.domain.FavoriteGroup;
import com.ssafy.ozz.favorite.dto.request.FavoriteGroupCreateRequest;
import com.ssafy.ozz.favorite.dto.request.FavoriteListDeleteRequest;
import com.ssafy.ozz.favorite.dto.response.FavoriteGroupBasicResponse;
import com.ssafy.ozz.favorite.dto.response.FavoriteGroupImageResponse;
import com.ssafy.ozz.favorite.dto.response.FavoriteResponse;
import com.ssafy.ozz.favorite.global.feign.coordinate.CoordinateClient;
import com.ssafy.ozz.favorite.repository.FavoriteGroupRepository;
import com.ssafy.ozz.favorite.repository.FavoriteRepository;
import com.ssafy.ozz.library.error.exception.CoordinateNotFoundException;
import com.ssafy.ozz.library.error.exception.FavoriteDuplicatedException;
import com.ssafy.ozz.library.error.exception.FavoriteGroupNotFoundException;
import com.ssafy.ozz.library.error.exception.FavoriteNotFoundException;
import com.ssafy.ozz.library.file.FileInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final FavoriteGroupRepository favoriteGroupRepository;
    private final CoordinateClient coordinateClient;

    @Override
    public FavoriteResponse addFavorite(Long favoriteGroupId, Long coordinateId) {
        FavoriteGroup favoriteGroup = favoriteGroupRepository.findById(favoriteGroupId)
                .orElseThrow(FavoriteGroupNotFoundException::new);

        if(favoriteRepository.findByFavoriteGroupAndCoordinateId(favoriteGroup, coordinateId).isPresent()){
            throw new FavoriteDuplicatedException();
        }

        Favorite favorite = Favorite.builder()
                .favoriteGroup(favoriteGroup)
                .coordinateId(coordinateId)
                .build();

        return FavoriteResponse.of(favoriteRepository.save(favorite),coordinateClient.getCoordinate(coordinateId).orElseThrow(CoordinateNotFoundException::new));
    }

    @Override
    public void deleteFavorite(Long favoriteGroupId, Long coordinateId) {
        Favorite favorite = favoriteRepository.findByFavoriteGroupAndCoordinateId(
                favoriteGroupRepository.findById(favoriteGroupId).orElseThrow(FavoriteGroupNotFoundException::new),
                coordinateId)
                .orElseThrow(FavoriteNotFoundException::new);
        favoriteRepository.delete(favorite);
    }

    @Override
    public void deleteFavoriteList(Long favoriteGroupId, FavoriteListDeleteRequest request) {
        FavoriteGroup favoriteGroup = favoriteGroupRepository.findById(favoriteGroupId).orElseThrow(FavoriteGroupNotFoundException::new);
        request.coordinateIdList().forEach(coordinateId -> {
            Favorite favorite = favoriteRepository.findByFavoriteGroupAndCoordinateId(favoriteGroup,coordinateId).orElseThrow(FavoriteNotFoundException::new);
            favoriteRepository.delete(favorite);
        });
    }

    @Override
    public void deleteFavoriteGroup(Long favoriteGroupId) {
        FavoriteGroup favoriteGroup = favoriteGroupRepository.findById(favoriteGroupId).orElseThrow(FavoriteNotFoundException::new);

        favoriteRepository.deleteAll(favoriteGroup.getFavorites());
        favoriteGroupRepository.delete(favoriteGroup);
    }

    @Override
    public List<Favorite> getFavoritesByGroup(Long favoriteGroupId) {
        FavoriteGroup favoriteGroup = favoriteGroupRepository.findById(favoriteGroupId)
                .orElseThrow(FavoriteGroupNotFoundException::new);
        return favoriteRepository.findAllByFavoriteGroup(favoriteGroup);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FavoriteResponse> getFavoriteResponseListByGroup(Long favoriteGroupId) {
        FavoriteGroup favoriteGroup = favoriteGroupRepository.findById(favoriteGroupId)
                .orElseThrow(FavoriteGroupNotFoundException::new);
        return favoriteRepository.findAllByFavoriteGroup(favoriteGroup).stream().map(favorite ->
            FavoriteResponse.of(favorite, coordinateClient.getCoordinate(favorite.getCoordinateId()).orElseThrow(CoordinateNotFoundException::new))
        ).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<FavoriteGroupImageResponse> getFavoriteGroupResponseListOfUser(Long userId) {
        return favoriteGroupRepository.findByUserId(userId).stream().map(favoriteGroup -> {
            List<FileInfo> imageFileList = favoriteGroup.getFavorites().stream().map(favorite ->
                    coordinateClient.getCoordinate(favorite.getCoordinateId()).orElseThrow(CoordinateNotFoundException::new).imageFile()).toList();
            return FavoriteGroupImageResponse.of(favoriteGroup, imageFileList);
        }).toList();
    }

    @Override
    public FavoriteGroup createFavoriteGroup(FavoriteGroup favoriteGroup) {
        return favoriteGroupRepository.save(favoriteGroup);
    }

    @Override
    public FavoriteGroupBasicResponse createFavoriteGroup(Long userId, FavoriteGroupCreateRequest request) {
        return FavoriteGroupBasicResponse.of(favoriteGroupRepository.save(request.toEntity(userId)));
    }
}
