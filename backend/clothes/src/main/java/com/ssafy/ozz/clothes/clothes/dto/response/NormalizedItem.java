package com.ssafy.ozz.clothes.clothes.dto.response;

import com.ssafy.ozz.clothes.clothes.dto.request.ExtractAttribute;

public record NormalizedItem(
        String category,
        String name,
        String color
){
    public ExtractAttribute toExtractAttribute(Long clothId, String imgUrl) {
        return ExtractAttribute.builder()
                .clothId(clothId)
                .imgUrl(imgUrl)
                .category(category)
                .name(name)
                .color(color)
                .build();
    }
}
