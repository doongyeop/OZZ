package com.ssafy.ozz.clothes.coordinate.service;

import com.ssafy.ozz.clothes.coordinate.domain.Coordinate;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateCreateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateSearchCondition;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateUpdateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.response.CoordinateBasicResponse;
import com.ssafy.ozz.clothes.coordinate.dto.response.CoordinateResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CoordinateService {
    CoordinateResponse createCoordinate(Long userId, MultipartFile imageFile, CoordinateCreateRequest request);

    CoordinateResponse getCoordinate(Long coordinateId);
    Coordinate getCoordinateEntity(Long coordinateId);

    List<CoordinateResponse> getCoordinatesOfUser(Long userId, CoordinateSearchCondition condition);

    Slice<CoordinateBasicResponse> getCoordinatesOfUser(Long userId, CoordinateSearchCondition condition, Pageable pageable);

    CoordinateResponse updateCoordinate(Long coordinateId, MultipartFile imageFile, CoordinateUpdateRequest request);

    void deleteCoordinate(Long coordinateId);

    Slice<CoordinateBasicResponse> searchCoordinates(CoordinateSearchCondition condition, Pageable pageable);

    CoordinateBasicResponse getCoordinateBasicResponse(Long coordinateId);
}
