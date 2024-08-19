package com.ssafy.ozz.library.clothes.properties;

import lombok.Getter;

@Getter
public enum Texture implements Property {
    FUR("퍼"),
    KNIT("니트"),
    MOUTON("무스탕"),
    LACE("레이스"),
    SUEDE("스웨이드"),
    LINEN("린넨"),
    ANGORA("앙고라"),
    MESH("메시"),
    CORDUROY("코듀로이"),
    FLEECE("플리스"),
    SEQUIN_GLITTER("시퀸글리터"),
    NEOPRENE("네오프렌"),
    DENIM("데님"),
    SILK("실크"),
    JERSEY("저지"),
    SPANDEX("스판덱스"),
    TWEED("트위드"),
    JACQUARD("자카드"),
    VELVET("벨벳"),
    LEATHER("가죽"),
    VINYL_PVC("비닐"),
    COTTON("면"),
    WOOL_CASHMERE("울"),
    CHIFFON("시폰"),
    SYNTHETIC_POLYESTER("폴리");
    private final String displayName;

    Texture(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String getCode() {
        return this.name();
    }

    @Override
    public String getName() {
        return this.displayName;
    }
}
