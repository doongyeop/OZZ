package com.ssafy.ozz.clothes.clothes.dto.response;

import com.ssafy.ozz.clothes.category.dto.CategoryHighBasicResponse;
import com.ssafy.ozz.clothes.category.dto.CategoryLowResponse;
import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import com.ssafy.ozz.library.clothes.properties.*;
import com.ssafy.ozz.library.file.FileInfo;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toEnums;

@Schema(description = "옷 상세 정보 DTO with 파일 DTO")
public record ClothesWithFileResponse(
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
        CategoryHighBasicResponse categoryHigh,
        CategoryLowResponse categoryLow,
        FileInfo imageFile
) {
    public ClothesWithFileResponse(Clothes clothes, FileInfo fileInfo) {
        this(
                clothes.getName(),
                clothes.getSize(),
                clothes.getFit(),
                clothes.getMemo(),
                clothes.getBrand(),
                clothes.getPurchaseDate(),
                clothes.getPurchaseSite(),
                toEnums(Color.class, clothes.getColor()),
                toEnums(Texture.class, clothes.getTexture()),
                toEnums(Season.class, clothes.getSeason()),
                toEnums(Style.class, clothes.getStyle()),
                toEnums(Pattern.class, clothes.getPattern()),
                CategoryHighBasicResponse.of(clothes.getCategoryLow()),
                CategoryLowResponse.of(clothes.getCategoryLow()),
                fileInfo
        );
    }
}
