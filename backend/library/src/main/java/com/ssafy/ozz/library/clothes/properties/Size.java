package com.ssafy.ozz.library.clothes.properties;

import lombok.Getter;

@Getter
public enum Size implements Property {
    FREE("free"),
    S("small"),
    M("medium"),
    L("large"),
    XL("xlarge"),
    XXL("xxlarge");

    private final String displayName;

    Size(String displayName) {
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
