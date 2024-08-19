package com.ssafy.ozz.library.clothes.properties;

public enum Pattern implements Property {
    SOLID("무지"),
    STRIPED("줄무늬"),
    ZIGZAG("지그재그"),
    LEOPARD("호피"),
    ZEBRA("지브라"),
    ARGYLE("아가일"),
    DOT("도트"),
    PAISLEY("페이즐리"),
    CAMOUFLAGE("카모플라쥬"),
    FLORAL("플로럴"),
    LETTERING("레터링"),
    GRAPHIC("그래픽"),
    SKULL("해골"),
    TIE_DYE("타이다이"),
    GINGHAM("깅엄"),
    GRADATION("그라데이션"),
    CHECK("체크"),
    HOUNDSTOOTH("하운즈투스");

    private final String displayName;

    Pattern(String displayName) {
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

