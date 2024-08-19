package com.ssafy.ozz.clothes.category.enums;

import lombok.Getter;

@Deprecated(forRemoval = true)
@Getter
public enum CategoryHigh {
    TOP("상의", new CategoryLow[] {
        CategoryLow.TOP, CategoryLow.BLOUSE, CategoryLow.TSHIRT,CategoryLow.KNITWEAR,CategoryLow.SHIRT,CategoryLow.BRATOP,CategoryLow.HOODIE
    }),
    BOTTOM("하의", new CategoryLow[] {
        CategoryLow.JEANS, CategoryLow.PANTS, CategoryLow.SKIRT, CategoryLow.LEGGINGS, CategoryLow.JOGGERS
    }),
    OUTERWEAR("아우터", new CategoryLow[] {
        CategoryLow.COAT, CategoryLow.JACKET, CategoryLow.JUMPER, CategoryLow.PADDING, CategoryLow.VEST, CategoryLow.CARDIGAN, CategoryLow.ZIPUP
    }),
    DRESS("원피스", new CategoryLow[] {
        CategoryLow.DRESS, CategoryLow.JUMPSUIT
    }),
    SHOES("신발", new CategoryLow[] {
        CategoryLow.SNEAKERS, CategoryLow.HEELS, CategoryLow.SANDALS
    }),
    ACCESSORIES("악세서리", new CategoryLow[] {
        CategoryLow.JEWELRY, CategoryLow.HAT, CategoryLow.OTHER
    }),
    BAG("가방", new CategoryLow[] {
    });

    private final String displayName;
    private final CategoryLow[] categoryLowList;

    CategoryHigh(String displayName, CategoryLow[] categoryLowList) {
        this.displayName = displayName;
        this.categoryLowList = categoryLowList;
    }
}