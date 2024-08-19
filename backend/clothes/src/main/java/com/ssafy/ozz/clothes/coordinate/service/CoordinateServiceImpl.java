package com.ssafy.ozz.clothes.coordinate.service;

import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.clothes.clothes.service.ClothesService;
import com.ssafy.ozz.clothes.coordinate.domain.Coordinate;
import com.ssafy.ozz.clothes.coordinate.domain.CoordinateClothes;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateClothesCreateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateCreateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateSearchCondition;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateUpdateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.response.CoordinateBasicResponse;
import com.ssafy.ozz.clothes.coordinate.dto.response.CoordinateResponse;
import com.ssafy.ozz.clothes.coordinate.repository.jpa.CoordinateClothesRepository;
import com.ssafy.ozz.clothes.coordinate.repository.jpa.CoordinateRepository;
import com.ssafy.ozz.clothes.global.fegin.file.FileClient;
import com.ssafy.ozz.library.error.exception.CoordinateNotFoundException;
import com.ssafy.ozz.library.error.exception.FileNotFoundException;
import com.ssafy.ozz.library.file.FileInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CoordinateServiceImpl implements CoordinateService {
    private final CoordinateRepository coordinateRepository;
    private final CoordinateClothesRepository coordinateClothesRepository;
    private final ClothesService clothesService;
    private final FileClient fileClient;

    @Override
    public CoordinateResponse createCoordinate(Long userId, MultipartFile imageFile, CoordinateCreateRequest request) {
        FileInfo fileInfo = fileClient.uploadFile(imageFile).orElseThrow();

        Coordinate coordinate = request.toEntity(userId,fileInfo.fileId());
        coordinateRepository.save(coordinate);
        saveCoordinateClothesList(coordinate, request.clothesList());

        return CoordinateResponse.of(coordinate,fileClient.getFile(coordinate.getImageFileId()).orElseThrow(FileNotFoundException::new));
    }

    @Override
    @Transactional(readOnly = true)
    public CoordinateResponse getCoordinate(Long coordinateId) {
        Coordinate coordinate = coordinateRepository.findById(coordinateId).orElseThrow(CoordinateNotFoundException::new);
        return CoordinateResponse.of(coordinate,fileClient.getFile(coordinate.getImageFileId()).orElseThrow(FileNotFoundException::new));
    }

    @Override
    public CoordinateBasicResponse getCoordinateBasicResponse(Long coordinateId) {
        Coordinate coordinate = coordinateRepository.findById(coordinateId).orElseThrow(CoordinateNotFoundException::new);
        return CoordinateBasicResponse.of(coordinate,fileClient.getFile(coordinate.getImageFileId()).orElseThrow(FileNotFoundException::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Coordinate getCoordinateEntity(Long coordinateId) {
        return coordinateRepository.findById(coordinateId).orElseThrow(CoordinateNotFoundException::new);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CoordinateResponse> getCoordinatesOfUser(Long userId, CoordinateSearchCondition condition) {
        List<Coordinate> coordinateList = coordinateRepository.findByUserId(userId, condition);
        return coordinateList.stream().map(coordinate -> {
            FileInfo fileInfo = fileClient.getFile(coordinate.getImageFileId()).orElseThrow(FileNotFoundException::new);
            return CoordinateResponse.of(coordinate, fileInfo);
        }).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Slice<CoordinateBasicResponse> getCoordinatesOfUser(Long userId, CoordinateSearchCondition condition, Pageable pageable) {
        return coordinateRepository.findByUserId(userId, condition, pageable).map(coordinate -> {
            FileInfo fileInfo = fileClient.getFile(coordinate.getImageFileId()).orElseThrow(FileNotFoundException::new);
            return CoordinateBasicResponse.of(coordinate, fileInfo);
        });
    }

    @Override
    public CoordinateResponse updateCoordinate(Long coordinateId, MultipartFile imageFile, CoordinateUpdateRequest request) {
        Coordinate coordinate = getCoordinateEntity(coordinateId);
        coordinate.updateName(request.name());
        coordinate.updateStyle(request.styleList());

        coordinateClothesRepository.deleteAll(coordinateClothesRepository.findByCoordinate(coordinate));
        coordinate.setCoordinateClothesList(saveCoordinateClothesList(coordinate, request.clothesList()));

        return CoordinateResponse.of(coordinate,fileClient.getFile(coordinate.getImageFileId()).orElseThrow(FileNotFoundException::new));
    }

    @Override
    public void deleteCoordinate(Long coordinateId) {
        coordinateClothesRepository.deleteAll(coordinateClothesRepository.findByCoordinateId(coordinateId));
        coordinateRepository.deleteById(coordinateId);
    }

    @Override
    public Slice<CoordinateBasicResponse> searchCoordinates(CoordinateSearchCondition condition, Pageable pageable) {
        return coordinateRepository.findByCondition(condition, pageable).map(coordinate -> {
            FileInfo fileInfo = fileClient.getFile(coordinate.getImageFileId()).orElseThrow(FileNotFoundException::new);
            return new CoordinateBasicResponse(coordinate, fileInfo);
        });
    }

    private List<CoordinateClothes> saveCoordinateClothesList(Coordinate coordinate, List<CoordinateClothesCreateRequest> clothesList) {
        return coordinateClothesRepository.saveAll(clothesList.stream().map(coordinateClothes-> {
            Clothes clothes = clothesService.getClothes(coordinateClothes.clothesId());
            return coordinateClothes.toEntity(coordinate, clothes);
        }).toList());
    }
}
