package com.ssafy.ozz.clothes.clothes.dto.response;

import com.ssafy.ozz.library.clothes.properties.ColorProperty;

public record ColorResponse (
    String code,
    String name,
    String colorCode
){
    public ColorResponse (ColorProperty color) {
        this(
            color.getCode(),
            color.getName(),
            color.getColorCode()
        );
    }
}