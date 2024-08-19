package com.ssafy.ozz.clothes.clothes.dto.request;

import lombok.Builder;

@Builder
public record ExtractAttribute(
        Long clothId,
        String name,
        String category,
        String color,
        String imgUrl
){

}