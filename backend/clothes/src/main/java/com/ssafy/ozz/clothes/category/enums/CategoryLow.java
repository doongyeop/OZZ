package com.ssafy.ozz.clothes.category.enums;

import lombok.Getter;

@Deprecated
@Getter
public enum CategoryLow {
        // 상의 세부 카테고리
        TOP("탑"),
        BLOUSE("블라우스"),
        TSHIRT("티셔츠"),
        KNITWEAR("니트웨어"),
        SHIRT("셔츠"),
        BRATOP("브라탑"),
        HOODIE("후드티"),
        // 하의 세부 카테고리
        JEANS("청바지"),
        PANTS("팬츠"),
        SKIRT("스커트"),
        LEGGINGS("레깅스"),
        JOGGERS("조거팬츠"),
        // 아우터 세부 카테고리
        COAT("코트"),
        JACKET("재킷"),
        JUMPER("점퍼"),
        PADDING("패딩"),
        VEST("베스트"),
        CARDIGAN("가디건"),
        ZIPUP("짚업"),
        // 드레스 세부 카테고리
        DRESS("드레스"),
        JUMPSUIT("점프수트"),
        // 신발 세부 카테고리
        SNEAKERS("운동화"),
        HEELS("구두"),
        SANDALS("샌들/슬리퍼"),
        // 악세서리 세부 카테고리
        JEWELRY("주얼리"),
        OTHER("기타"),
        HAT("모자");

        private final String displayName;

        CategoryLow(String displayName) {
            this.displayName = displayName;
        }
}