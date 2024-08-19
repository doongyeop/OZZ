package com.ssafy.ozz.clothes.clothes.service;

import com.ssafy.ozz.clothes.category.domain.CategoryLow;
import com.ssafy.ozz.clothes.category.service.CategoryService;
import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.clothes.clothes.domain.ClothesDocument;
import com.ssafy.ozz.clothes.clothes.dto.request.*;
import com.ssafy.ozz.clothes.clothes.dto.response.*;
import com.ssafy.ozz.clothes.clothes.repository.elasticsearch.ClothesSearchRepository;
import com.ssafy.ozz.clothes.clothes.repository.jpa.ClothesRepository;
import com.ssafy.ozz.clothes.coordinate.repository.jpa.CoordinateClothesRepository;
import com.ssafy.ozz.clothes.global.fegin.file.FileClient;
import com.ssafy.ozz.library.error.exception.ClothesNotFoundException;
import com.ssafy.ozz.library.error.exception.FileNotFoundException;
import com.ssafy.ozz.library.file.FileInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.elasticsearch.core.RefreshPolicy;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toBits;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ClothesServiceImpl implements ClothesService {
    private final ClothesRepository clothesRepository;
    private final ClothesSearchRepository clothesSearchRepository;
    private final CategoryService categoryService;
    private final FileClient fileClient;
    private final WebClient webClient;
    private final MqService mqService;
    private final CoordinateClothesRepository coordinateClothesRepository;

    @Override
    @Transactional(readOnly = true)
    public Clothes getClothes(Long clothesId) {
        return clothesRepository.findById(clothesId).orElseThrow(ClothesNotFoundException::new);
    }

    @Override
    public ClothesWithFileResponse getClothesWithFile(Long clothesId){
        Clothes clothes = getClothes(clothesId);
        return new ClothesWithFileResponse(clothes,fileClient.getFile(clothes.getImageFileId()).orElseThrow(FileNotFoundException::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Slice<ClothesBasicWithFileResponse> getClothesOfUserWithFile(Long userId, ClothesSearchCondition condition, Pageable pageable) {
        if(condition.keyword() == null || condition.keyword().isEmpty()){
            return clothesRepository.findByUserId(userId, condition, pageable).map(this::toClothesBasicWithFileResponse);
        }else{
            return clothesRepository.findByCondition(userId, condition, pageable).map(this::toClothesBasicWithFileResponse);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Slice<Clothes> getClothesOfUser(Long userId, ClothesSearchCondition condition, Pageable pageable) {
        return clothesRepository.findByUserId(userId, condition, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClothesForRecommendationResponse> getClothesOfUser(Long userId) {
        return clothesRepository.findAllByUserIdAndProcessingLessThanEqual(userId,0).stream().map(clothes -> {
            FileInfo fileInfo = fileClient.getFile(clothes.getImageFileId()).orElseThrow(FileNotFoundException::new);
            return new ClothesForRecommendationResponse(clothes, fileInfo);
        }).toList();
    }

    @Override
    public Clothes saveClothes(Long userId, MultipartFile imageFile, ClothesCreateRequest request) {
        CategoryLow categoryLow = categoryService.getCategoryLow(request.categoryLowId());
        FileInfo fileInfo = fileClient.uploadFile(imageFile).orElseThrow(FileNotFoundException::new);
        Long imageFileId = fileInfo.fileId();
        Clothes clothes = clothesRepository.save(request.toEntity(categoryLow,imageFileId,userId));
        clothesSearchRepository.save(new ClothesDocument(clothes));
        return clothes;
    }

    @Override
    public Clothes updateClothes(Long clothesId, ClothesUpdateRequest request) {
        Clothes clothes = getClothes(clothesId);
        if(request.categoryLowId() != null)
            clothes.changeCategoryLow(categoryService.getCategoryLow(request.categoryLowId()));
        clothes.changeName(request.name());
        clothes.changeSize(request.size());
        clothes.changeFit(request.fit());
        clothes.changeMemo(request.memo());
        clothes.changeBrand(request.brand());
        clothes.changePurchaseDate(request.purchaseDate());
        clothes.changePurchaseSite(request.purchaseSite());
        clothes.changeColor(toBits(request.colorList()));
        clothes.changeTexture(toBits(request.textureList()));
        clothes.changeSeason(toBits(request.seasonList()));
        clothes.changeStyle(toBits(request.styleList()));
        clothes.changePattern(toBits(request.patternList()));
        clothes.changeExtra(request.extra());
        clothes.updateProcessing(request.processing());
        clothes.changeUpdatedDate();

        return clothes;
    }

    @Override
    public ClothesWithFileResponse updateClothes(Long clothesId, ClothesUpdateRequest request, MultipartFile imageFile) {
        Clothes clothes = updateClothes(clothesId, request);
        FileInfo fileInfo;
        if(imageFile != null){
            // 이미지 파일 수정
            fileInfo = fileClient.uploadFile(imageFile).orElseThrow();
            clothes.updateImageFile(fileInfo.fileId());
        }else{
            // 기존 이미지 파일 불러오기
            fileInfo = fileClient.getFile(clothes.getImageFileId()).orElseThrow();
        }

        Optional<ClothesDocument> optionalDocument = clothesSearchRepository.findById(clothesId);
        if (optionalDocument.isPresent()) {
            ClothesDocument document = optionalDocument.get();
            document.update(clothes);
            clothesRepository.update(document);
        }

        return new ClothesWithFileResponse(clothes, fileInfo);
    }

    @Override
    public Long updateClothes(Long clothesId, MultipartFile imageFile) {
        Clothes clothes = getClothes(clothesId);
        FileInfo fileInfo = fileClient.uploadFile(imageFile).orElseThrow();
        clothes.updateImageFile(fileInfo.fileId());
        clothes.updateProcessing(-1);

        Optional<ClothesDocument> optionalDocument = clothesSearchRepository.findById(clothesId);
        if (optionalDocument.isPresent()) {
            ClothesDocument document = optionalDocument.get();
            document.update(clothes);
            clothesRepository.update(document);
        }
        return clothesId;
    }

    @Override
    public void deleteClothes(Long clothesId) {
        clothesSearchRepository.deleteById(clothesId);
        coordinateClothesRepository.deleteAllByClothes_ClothesId(clothesId);
        clothesRepository.deleteById(clothesId);
    }

    @Override
    public void deleteClothesList(List<Long> clothesIdList){
        clothesIdList.forEach(this::deleteClothes);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Clothes> getClothesInCoordinate(Long coordinateId) {
        return List.of();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Clothes> getClothesInRecCoordinate(Long coordinateId) {
        return List.of();
    }

    @Override
    public Flux<ServerSentEvent<String>> batchRegisterPurchaseHistory(Long userId, List<PurchaseHistory> purchaseHistories) {
        int totalItems = purchaseHistories.size();
        final int batchSize = 10;

        Sinks.Many<ServerSentEvent<String>> sink = Sinks.many().unicast().onBackpressureBuffer();

        webClient.post()
                .uri("/api/v1/purchase-history/normalize")
                .bodyValue(purchaseHistories)
                .retrieve()
                .bodyToFlux(NormalizedResponse.class)
                .flatMap(response->{
                    int index= response.index()*batchSize;
                    List<ExtractAttribute> extractAttributes = new ArrayList<>();
                    for (NormalizedItem item : response.data()) {
                        if(item.category()!=null){
                            PurchaseHistory purchaseHistory=purchaseHistories.get(index);
                            Clothes normalizedHistory = purchaseHistory.toEntity(userId,item.name());
                            Long clothId = clothesRepository.save(normalizedHistory).getClothesId();
                            ExtractAttribute temp=item.toExtractAttribute(clothId, purchaseHistory.imgUrl());
                            extractAttributes.add(temp);
                        }
                        index++;
                    }
                    mqService.send(extractAttributes);
                    System.out.println(extractAttributes);
                    return Mono.just(100*((response.index()+1)/(Math.ceil(totalItems/(double)batchSize))));
                })
                .doOnNext(progress -> {
                    sink.tryEmitNext(ServerSentEvent.builder((int)Math.ceil(progress)+"%").build());
                })
                .doOnComplete(sink::tryEmitComplete)
                .subscribe();

        return sink.asFlux();
    }

    /* Elasticsearch */
    @Override
    @Transactional(readOnly = true)
    public Slice<ClothesBasicWithFileResponse> searchClothes(ClothesSearchCondition condition, Pageable pageable) {
        return clothesRepository.findByCondition(condition, pageable).map(this::toClothesBasicWithFileResponse);
    }

    private ClothesBasicWithFileResponse toClothesBasicWithFileResponse(ClothesDocument clothes) {
        FileInfo fileInfo = null;
        if (clothes.getImageFileId() != null) {
            fileInfo = fileClient.getFile(clothes.getImageFileId()).orElseThrow(FileNotFoundException::new);
        }
        CategoryLow categoryLow = null;
        if (clothes.getCategoryLowId() != null) {
            categoryLow = categoryService.getCategoryLow(clothes.getCategoryLowId());
        }
        return new ClothesBasicWithFileResponse(clothes, categoryLow, fileInfo);
    }

    private ClothesBasicWithFileResponse toClothesBasicWithFileResponse(Clothes clothes) {
        FileInfo fileInfo = null;
        if (clothes.getImageFileId() != null) {
            fileInfo = fileClient.getFile(clothes.getImageFileId()).orElseThrow(FileNotFoundException::new);
        }
        return new ClothesBasicWithFileResponse(clothes, fileInfo);
    }
}
