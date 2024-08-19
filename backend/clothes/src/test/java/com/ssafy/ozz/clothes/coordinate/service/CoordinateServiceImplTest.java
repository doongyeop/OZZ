package com.ssafy.ozz.clothes.coordinate.service;

import com.ssafy.ozz.clothes.category.domain.CategoryHigh;
import com.ssafy.ozz.clothes.category.service.CategoryService;
import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.clothes.clothes.properties.Style;
import com.ssafy.ozz.clothes.clothes.repository.jpa.ClothesRepository;
import com.ssafy.ozz.clothes.coordinate.domain.CoordinateClothes;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateClothesCreateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateCreateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateSearchCondition;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateUpdateRequest;
import com.ssafy.ozz.clothes.coordinate.dto.response.CoordinateResponse;
import com.ssafy.ozz.clothes.coordinate.exception.CoordinateNotFoundException;
import com.ssafy.ozz.clothes.coordinate.repository.jpa.CoordinateClothesRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class CoordinateServiceImplTest {
    @Autowired
    private CoordinateService coordinateService;

    @Autowired
    private ClothesRepository clothesRepository;

    @Autowired
    private CoordinateClothesRepository coordinateClothesRepository;

    @Autowired
    private CategoryService categoryService;

    // 픽스처
    List<CategoryHigh> categoryHighList;
    Long userId = 1L;

    @BeforeEach
    void setUp() {
        // 상위 카테고리별로 1개씩 옷 생성
        categoryHighList = categoryService.getAllCategoryHigh();
    }

    @Test
    void createCoordinate() {
        // given
        String name = "서터릿 코디";
        List<Style> styleList = Arrays.asList(Style.STREET, Style.CASUAL);
        List<Clothes> clothesList = saveAndGetClothesList();
        CoordinateCreateRequest request = getCoordinateCreateRequest(name, styleList, clothesList);
        // when
        CoordinateResponse coordinate = coordinateService.createCoordinate(userId, null, request);

        // then
        List<CoordinateClothes> coordinateClothes = coordinateClothesRepository.findByCoordinateId(coordinate.coordinateId());
        assertThat(coordinateClothes.size()).isEqualTo(clothesList.size());
        assertThat(coordinate.name()).isEqualTo(name);
        assertThat(coordinate.styleList()).isEqualTo(styleList);
    }

    @Test
    void getCoordinate() {
        // given
        String name = "캐주얼 코디";
        List<Style> styleList = Arrays.asList(Style.CASUAL, Style.CLASSIC);
        List<Clothes> clothesList = saveAndGetClothesList();
        CoordinateCreateRequest request = getCoordinateCreateRequest(name, styleList, clothesList);
        Long coordinateId = coordinateService.createCoordinate(userId, null, request).coordinateId();

        // when
        CoordinateResponse coordinate = coordinateService.getCoordinate(coordinateId);

        // then
        assertThat(coordinate.coordinateId()).isEqualTo(coordinateId);
    }

    @Test
    void getCoordinatesOfUser() {
        // pagenation 적용 X
        // given
        String name = "캐주얼 코디";
        List<Style> styleList = Arrays.asList(Style.CASUAL, Style.CLASSIC);
        List<Clothes> clothesList = saveAndGetClothesList();
        CoordinateCreateRequest request = getCoordinateCreateRequest(name, styleList, clothesList);
        coordinateService.createCoordinate(userId, null, request);

        String name2 = "캐주얼 코디";
        List<Style> styleList2 = Arrays.asList(Style.CASUAL, Style.STREET);
        List<Clothes> clothesList2 = saveAndGetClothesList();
        CoordinateCreateRequest request2 = getCoordinateCreateRequest(name2, styleList2, clothesList2);
        coordinateService.createCoordinate(userId, null, request2);

        CoordinateSearchCondition condition = CoordinateSearchCondition.builder()
                .styleList(List.of(Style.CASUAL))
                .build();

        // when
        List<CoordinateResponse> coordinateList = coordinateService.getCoordinatesOfUser(userId, condition);

        // then
        assertThat(coordinateList.size()).isEqualTo(2);
    }

    @Test
    void getCoordinatesOfUserWithPagination() {
    }

    @Test
    void updateCoordinate() {
        // given
        String name = "캐주얼 코디";
        List<Style> styleList = Arrays.asList(Style.CASUAL, Style.CLASSIC);
        List<Clothes> originClothesList = saveAndGetClothesList();
        CoordinateCreateRequest createRequest = getCoordinateCreateRequest(name, styleList, originClothesList);
        CoordinateResponse coordinate = coordinateService.createCoordinate(userId, null, createRequest);

        List<Clothes> updateClothesList = saveAndGetClothesList();
        CoordinateUpdateRequest updateRequest = CoordinateUpdateRequest.builder()
                .name("스트릿 코디")
                .styleList(List.of(Style.STREET, Style.GENDERLESS))
                .clothesList(getCoordinateClothesCreateRequests(updateClothesList))
                .build();
        // when
        CoordinateResponse updatedCoordinate = coordinateService.updateCoordinate(coordinate.coordinateId(), null, updateRequest);
        Integer totalCoordinateClothes = coordinateClothesRepository.findByCoordinateId(coordinate.coordinateId()).size();

        // then
        assertThat(updatedCoordinate.name()).isEqualTo(updateRequest.name());
        assertThat(updatedCoordinate.styleList()).isEqualTo(updateRequest.styleList());
        assertThat(updatedCoordinate.clothesList().size()).isEqualTo(totalCoordinateClothes);
    }

    @Test
    void deleteCoordinate() {
        // given
        String name = "캐주얼 코디";
        List<Style> styleList = Arrays.asList(Style.CASUAL, Style.CLASSIC);
        List<Clothes> originClothesList = saveAndGetClothesList();
        CoordinateCreateRequest createRequest = getCoordinateCreateRequest(name, styleList, originClothesList);
        CoordinateResponse coordinate = coordinateService.createCoordinate(userId, null, createRequest);

        // when
        coordinateService.deleteCoordinate(coordinate.coordinateId());

        // then
        assertThatThrownBy(()->coordinateService.getCoordinate(coordinate.coordinateId())).isInstanceOf(CoordinateNotFoundException.class);
    }

    private CoordinateCreateRequest getCoordinateCreateRequest(String name, List<Style> styleList, List<Clothes> clothesList) {
        return CoordinateCreateRequest.builder()
                .name(name)
                .styleList(styleList)
                .clothesList(getCoordinateClothesCreateRequests(clothesList))
                .build();
    }

    private List<CoordinateClothesCreateRequest> getCoordinateClothesCreateRequests(List<Clothes> clothesList) {
        return clothesList.stream().map(clothes ->
                CoordinateClothesCreateRequest.builder()
                        .clothesId(clothes.getClothesId())
                        .offset(1).build()
        ).toList();
    }

    private List<Clothes> saveAndGetClothesList(){
        List<Clothes> clothesList = new ArrayList<>();
        categoryHighList.forEach(categoryHigh -> {
            clothesList.add(clothesRepository.save(Clothes.mock(userId,categoryHigh)));
        });
        return clothesList;
    }
}