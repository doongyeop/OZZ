package com.ssafy.ozz.clothes.coordinate.controller;

import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateCreateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateSearchCondition;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateUpdateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.response.CoordinateBasicResponse;
import com.ssafy.ozz.clothes.coordinate.dto.response.CoordinateResponse;
import com.ssafy.ozz.clothes.coordinate.service.CoordinateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.ozz.library.config.HeaderConfig.X_USER_ID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coordinates")
@Tag(name = "Coordinate API", description = "코디 관리 API")
public class CoordinateController {
    private final CoordinateService coordinateService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "새 코디 추가", description = "데이터베이스에 새 코디를 추가합니다.")
    public ResponseEntity<Long> createCoordinate(@Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId, @RequestPart final MultipartFile imageFile, @RequestPart final CoordinateCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(coordinateService.createCoordinate(userId,imageFile,request).coordinateId());
    }

    @GetMapping("/{coordinateId}")
    @Operation(summary = "코디 상세 조회", description = "ID를 통해 특정 코디 세부 정보를 조회합니다.")
    public ResponseEntity<CoordinateResponse> getCoordinate(@PathVariable final Long coordinateId) {
        return ResponseEntity.ok(coordinateService.getCoordinate(coordinateId));
    }

    @GetMapping("/{coordinateId}/basic")
    @Operation(summary = "코디 기본 정보 조회", description = "ID를 통해 특정 코디 기본 정보를 조회합니다.")
    public ResponseEntity<CoordinateBasicResponse> getCoordinateBasicResponse(@PathVariable final Long coordinateId) {
        return ResponseEntity.ok(coordinateService.getCoordinateBasicResponse(coordinateId));
    }

    @GetMapping("/users")
    @Operation(summary = "사용자의 코디 조회", description = "특정 사용자의 코디 목록을 슬라이스 형태로 조회합니다.")
    public ResponseEntity<Slice<CoordinateBasicResponse>> getCoordinateList(@Parameter(hidden = true) @RequestHeader(X_USER_ID) Long userId, @ModelAttribute CoordinateSearchCondition condition, Pageable pageable) {
        return ResponseEntity.ok(coordinateService.getCoordinatesOfUser(userId,condition,pageable));
    }

    @GetMapping("/search")
    @Operation(summary = "키워드로 코디 검색", description = "검색된 코디 목록을 슬라이스 형태로 조회합니다.")
    public ResponseEntity<Slice<CoordinateBasicResponse>> searchCoordinateList(@ModelAttribute CoordinateSearchCondition condition, Pageable pageable) {
        return ResponseEntity.ok(coordinateService.searchCoordinates(condition,pageable));
    }


    @PutMapping(path = "/{coordinateId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "코디 정보 수정", description = "ID를 통해 특정 코디의 세부 정보를 수정합니다.")
    public ResponseEntity<CoordinateResponse> updateCoordinate(@PathVariable final Long coordinateId, @RequestPart final MultipartFile imageFile, @RequestPart final CoordinateUpdateRequest request) {
        return ResponseEntity.ok(coordinateService.updateCoordinate(coordinateId,imageFile,request));
    }

    @DeleteMapping("/{coordinateId}")
    @Operation(summary = "코디 삭제", description = "ID를 통해 특정 코디를 삭제합니다.")
    public ResponseEntity<Void> deleteCoordinate(@PathVariable final Long coordinateId) {
        coordinateService.deleteCoordinate(coordinateId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}