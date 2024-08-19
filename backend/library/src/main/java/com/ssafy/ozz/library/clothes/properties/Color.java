package com.ssafy.ozz.library.clothes.properties;

import lombok.Getter;

@Getter
public enum Color implements ColorProperty{
    WHITE("흰색", "#FFFFFF"),
    BLACK("검정", "#000000"),
    GRAY("회색", "#E7E7E7"),
    RED("빨강", "#FF0000"),
    PINK("분홍", "#FEE0DE"),
    ORANGE("주황", "#FF820E"),
    BEIGE("베이지", "#E2C79C"),
    YELLOW("노랑", "#FEE600"),
    BROWN("갈색", "#844F1D"),
    GREEN("초록", "#1A9268"),
    KHAKI("카키", "#666B17"),
    MINT("민트", "#6BF1D8"),
    BLUE("파랑", "#1F4CE3"),
    NAVY("남색", "#060350"),
    SKY("하늘", "#C5E3FF"),
    PURPLE("보라", "#9C53BE"),
    LAVENDER("연보라", "#D7BEF5"),
    WINE("와인", "#9E213F"),
    NEON("네온", "#2FF40A"),
    GOLD("골드", "#E6C345");

    private final String displayName;
    private final String colorCode;

    Color(String displayName, String colorCode) {
        this.displayName = displayName;
        this.colorCode = colorCode;
    }

    @Override
    public String getCode() {
        return this.name();
    }

    @Override
    public String getName() {
        return this.displayName;
    }

    @Override
    public String getColorCode() {
        return this.colorCode;
    }
}
