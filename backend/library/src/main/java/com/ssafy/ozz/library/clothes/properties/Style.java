package com.ssafy.ozz.library.clothes.properties;

import lombok.Getter;

@Getter
public enum Style implements Property {
    FORMAL("포멀"),
    MANNISH("매니시"),
    ELEGANT("엘레강스"),
    ETHNIC("에스닉"),
    MODERN("모던"),
    NATURAL("내추럴"),
    ROMANTIC("로맨틱"),
    SPORTY("스포티"),
    STREET("스트릿"),
    CASUAL("캐주얼");

    private final String displayName;

    Style(String displayName) {
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
