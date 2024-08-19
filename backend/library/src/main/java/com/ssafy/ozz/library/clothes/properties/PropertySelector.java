package com.ssafy.ozz.library.clothes.properties;

import lombok.Getter;

@Getter
public enum PropertySelector {
    FIT(Fit.class),
    SEASON(Season.class),
    SIZE(Size.class),
    STYLE(Style.class),
    TEXTURE(Texture.class),
    COLOR(Color.class),
    PATTERN(Pattern.class);

    private final Class<? extends Enum<? extends Property>> propertyClass;

    <E extends Enum<E> & Property> PropertySelector(Class<E> propertyClass) {
        this.propertyClass = propertyClass;
    }
}