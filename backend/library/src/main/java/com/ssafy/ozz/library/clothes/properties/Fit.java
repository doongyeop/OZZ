package com.ssafy.ozz.library.clothes.properties;

import lombok.Getter;

@Getter
public enum Fit implements Property {
    OVER_FIT("오버핏"),
    SEMI_OVER_FIT("세미오버핏"),
    REGULAR_FIT("레귤러핏"),
    SLIM_FIT("슬림핏");

    private final String displayName;

    Fit(String displayName) {
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