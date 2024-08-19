package com.ssafy.ozz.favorite.controller;

import com.ssafy.ozz.favorite.dto.request.FavoriteGroupCreateRequest;
import com.ssafy.ozz.favorite.dto.request.FavoriteListDeleteRequest;
import com.ssafy.ozz.favorite.dto.response.FavoriteGroupBasicResponse;
import com.ssafy.ozz.favorite.dto.response.FavoriteGroupImageResponse;
import com.ssafy.ozz.favorite.dto.response.FavoriteResponse;
import com.ssafy.ozz.favorite.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.ozz.library.config.HeaderConfig.X_USER_ID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/favorites")
public class FavoriteController {
    private final FavoriteService favoriteService;

    @PostMapping
    @Operation(summary = "즐겨찾기 그룹 생성", description = "새로운 즐겨찾기 그룹을 생성합니다.")
    public ResponseEntity<FavoriteGroupBasicResponse> createFavoriteGroup(@Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId, @RequestBody FavoriteGroupCreateRequest request) {
        return new ResponseEntity<>(favoriteService.createFavoriteGroup(userId,request), HttpStatus.CREATED);
    }

    @PostMapping("/{favoriteGroupId}/coordinate/{coordinateId}")
    @Operation(summary = "즐겨찾기 그룹에 코디 추가", description = "즐겨찾기 그룹에 새로운 코디를 추가합니다.")
    public ResponseEntity<FavoriteResponse> addFavorite(@PathVariable Long favoriteGroupId, @PathVariable Long coordinateId) {
        return new ResponseEntity<>(favoriteService.addFavorite(favoriteGroupId, coordinateId), HttpStatus.CREATED);
    }

    @DeleteMapping("/{favoriteGroupId}/coordinate/{coordinateId}")
    @Operation(summary = "즐겨찾기 코디 삭제", description = "즐겨찾기 그룹에서 특정 코디를 삭제합니다.")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long favoriteGroupId, @PathVariable Long coordinateId) {
        favoriteService.deleteFavorite(favoriteGroupId, coordinateId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{favoriteGroupId}/coordinate")
    @Operation(summary = "즐겨찾기 코디 삭제", description = "즐겨찾기 그룹에서 여러 코디를 삭제합니다.")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long favoriteGroupId, @RequestBody FavoriteListDeleteRequest request) {
        favoriteService.deleteFavoriteList(favoriteGroupId, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{favoriteGroupId}")
    @Operation(summary = "즐겨찾기 삭제", description = "특정 즐겨찾기 그룹을 삭제합니다.")
    public ResponseEntity<Void> deleteFavoriteGroup(@PathVariable Long favoriteGroupId) {
        favoriteService.deleteFavoriteGroup(favoriteGroupId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{favoriteGroupId}")
    @Operation(summary = "즐겨찾기 상세 코디 목록 조회", description = "특정 즐겨찾기 그룹의 코디 목록을 조회합니다.")
    public ResponseEntity<List<FavoriteResponse>> getFavoritesByGroup(@PathVariable Long favoriteGroupId) {
        return new ResponseEntity<>(favoriteService.getFavoriteResponseListByGroup(favoriteGroupId), HttpStatus.OK);
    }

    @GetMapping("/users")
    @Operation(summary = "내 즐겨찾기 목록 조회", description = "내 즐겨찾기 그룹 목록을 조회합니다.")
    public ResponseEntity<List<FavoriteGroupImageResponse>> getFavoritesGroupListOfUsers(@Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId) {
        return new ResponseEntity<>(favoriteService.getFavoriteGroupResponseListOfUser(userId), HttpStatus.OK);
    }
}
