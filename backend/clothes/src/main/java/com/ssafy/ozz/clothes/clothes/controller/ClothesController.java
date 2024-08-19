package com.ssafy.ozz.clothes.clothes.controller;

import com.ssafy.ozz.clothes.clothes.dto.request.ClothesCreateRequest;
import com.ssafy.ozz.clothes.clothes.dto.request.ClothesUpdateRequest;
import com.ssafy.ozz.clothes.clothes.dto.request.ClothesSearchCondition;
import com.ssafy.ozz.clothes.clothes.dto.request.PurchaseHistory;
import com.ssafy.ozz.clothes.clothes.dto.response.*;
import com.ssafy.ozz.clothes.clothes.service.ClothesService;
import com.ssafy.ozz.library.clothes.properties.Color;
import com.ssafy.ozz.library.clothes.properties.Property;
import com.ssafy.ozz.library.clothes.properties.PropertySelector;
import com.ssafy.ozz.library.error.exception.FileNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;

import java.util.*;

import static com.ssafy.ozz.library.config.HeaderConfig.X_USER_ID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clothes")
@Tag(name = "Clothes API", description = "옷 관리 API")
public class ClothesController {
    private final ClothesService clothesService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "새 옷 추가", description = "데이터베이스에 새 옷을 추가합니다.")
    public ResponseEntity<Long> addClothes(@Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId, @RequestPart MultipartFile imageFile, @RequestPart ClothesCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(clothesService.saveClothes(userId, imageFile, request).getClothesId());
    }

    @GetMapping("/{clothesId}")
    @Operation(summary = "옷 상세 조회", description = "ID를 통해 특정 옷의 세부 정보를 조회합니다.")
    public ResponseEntity<ClothesWithFileResponse> getClothes(@PathVariable Long clothesId) {
        return ResponseEntity.ok(clothesService.getClothesWithFile(clothesId));
    }

    @GetMapping("/users")
    @Operation(summary = "사용자의 옷 조회", description = "특정 사용자의 옷 목록을 슬라이스 형태로 조회합니다.")
    public ResponseEntity<Slice<ClothesBasicWithFileResponse>> getClothesOfUser(
            @Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId,
            @ModelAttribute ClothesSearchCondition condition,
            Pageable pageable) {
        return ResponseEntity.ok(clothesService.getClothesOfUserWithFile(userId, condition, pageable));
    }

    @GetMapping("/users/all")
    @Operation(summary = "사용자의 모든 옷 조회", description = "특정 사용자의 모든 상세 옷 정보를 조회합니다.")
    public ResponseEntity<List<ClothesForRecommendationResponse>> getClothesOfUser(
            @Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId
    ) {
        return ResponseEntity.ok(clothesService.getClothesOfUser(userId));
    }

    @GetMapping("/search")
    @Operation(summary = "키워드로 옷 검색", description = "검색된 옷 목록을 슬라이스 형태로 조회합니다.")
    public ResponseEntity<Slice<ClothesBasicWithFileResponse>> searchClothes(
            @ModelAttribute ClothesSearchCondition condition,
            Pageable pageable) {
        return ResponseEntity.ok(clothesService.searchClothes(condition, pageable));
    }

    @PutMapping(value = "/{clothesId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "옷 정보 수정", description = "ID를 통해 특정 옷의 세부 정보를 수정합니다.")
    public ResponseEntity<ClothesWithFileResponse> updateClothes(
            @PathVariable Long clothesId,
            @RequestPart(required = false) MultipartFile imageFile,
            @RequestPart ClothesUpdateRequest request) {
        return ResponseEntity.ok().body(clothesService.updateClothes(clothesId, request, imageFile));
    }

    @PatchMapping(value = "/{clothesId}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "옷 이미지 수정", description = "ID를 통해 특정 옷의 이미지를 수정합니다.")
    public ResponseEntity<Long> updateClothes(
            @PathVariable Long clothesId,
            @RequestPart(required = false) MultipartFile imageFile) {
        return ResponseEntity.ok().body(clothesService.updateClothes(clothesId, imageFile));
    }

    @DeleteMapping("/{clothesId}")
    @Operation(summary = "옷 삭제", description = "ID를 통해 특정 옷을 삭제합니다.")
    public ResponseEntity<Void> deleteClothes(@PathVariable Long clothesId) {
        clothesService.deleteClothes(clothesId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping()
    @Operation(summary = "옷 목록 삭제", description = "ID를 통해 특정 옷을 삭제합니다.")
    public ResponseEntity<Void> deleteClothesList(@RequestBody List<Long> clothesIdList) {
        clothesService.deleteClothesList(clothesIdList);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/properties/colors")
    @Operation(summary = "색상 목록 정보 조회", description = "색상 목록 정보를 조회합니다.")
    public ResponseEntity<List<ColorResponse>> getColorList() {
        return ResponseEntity.ok().body(Arrays.stream(Color.values()).map(ColorResponse::new).toList());
    }
    @GetMapping("/properties/all")
    @Operation(summary = "옷 속성 목록 정보 일괄 조회", description = "옷 속성 목록 정보를 일괄 조회합니다.")
    public ResponseEntity<List<ClothesAttributesResponse>> getPropertyList() {
        return ResponseEntity.ok().body(Arrays.stream(PropertySelector.values())
                .map(property -> new ClothesAttributesResponse(
                        property.name(),
                        Arrays.stream(property.getPropertyClass().asSubclass(Property.class).getEnumConstants())
                                .map(PropertyResponse::new)
                                .toList()))
                .toList());
    }
    @GetMapping("/properties")
    @Operation(summary = "옷 속성 목록 정보 조회", description = "옷 속성 목록 정보를 조회합니다. [FIT, SEASON, SIZE, STYLE, TEXTURE] 중 택1")
    public ResponseEntity<List<PropertyResponse>> getPropertyList(@RequestParam("property") PropertySelector property) {
        return ResponseEntity.ok()
                .body(Arrays.stream(property.getPropertyClass().asSubclass(Property.class).getEnumConstants()).map(PropertyResponse::new).toList());
    }

    @PostMapping(path="/batch",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @Operation(summary = "불러오기로 새 옷 추가", description = "온라인 마켓의 구매내역을 통해 옷장을 채웁니다")
    public Flux<ServerSentEvent<String>> startBatch(@Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId, @RequestBody List<PurchaseHistory> purchaseHistories) {
        return clothesService.batchRegisterPurchaseHistory(userId, purchaseHistories);
    }
}
