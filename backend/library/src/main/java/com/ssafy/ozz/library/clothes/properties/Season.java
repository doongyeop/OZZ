package com.ssafy.ozz.library.clothes.properties;

import lombok.Getter;

@Getter
public enum Season implements Property {
    SPRING("봄"),
    SUMMER("여름"),
    AUTUMN("가을"),
    WINTER("겨울");

    private final String displayName;

    Season(String displayName) {
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
