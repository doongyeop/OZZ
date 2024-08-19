package com.ssafy.ozz.clothes.clothes.dto.response;

import java.util.List;

public record ClothesAttributesResponse (
        String name,
        List<PropertyResponse> properties
){
}
