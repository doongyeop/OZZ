package com.ssafy.ozz.clothes.clothes.dto.request;

import com.ssafy.ozz.clothes.category.domain.CategoryLow;
import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.library.clothes.properties.*;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toBits;

@Schema(description = "옷 생성 요청 DTO")
public record ClothesCreateRequest(
        String name,
        Size size,
        Fit fit,
        String memo,
        String brand,
        LocalDate purchaseDate,
        String purchaseSite,
        List<Color> colorList,
        List<Texture> textureList,
        List<Season> seasonList,
        List<Style> styleList,
        List<Pattern> patternList,
        String extra,
        Byte categoryLowId
) {
    public Clothes toEntity(CategoryLow categoryLow, Long imageFileId, Long userId) {
        return Clothes.builder()
                .name(name)
                .size(size)
                .fit(fit)
                .memo(memo)
                .brand(brand)
                .purchaseDate(purchaseDate)
                .purchaseSite(purchaseSite)
                .color(toBits(colorList))
                .texture(toBits(textureList))
                .style(toBits(styleList))
                .season(toBits(seasonList))
                .pattern(toBits(patternList))
                .categoryLow(categoryLow)
                .imageFileId(imageFileId)
                .userId(userId)
                .extra(extra)
                .build();
    }
}
