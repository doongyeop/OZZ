package com.ssafy.ozz.clothes.clothes.dto.response;

public record VectorResponse (
    float[] vector
){
    public static VectorResponse of(float[] vector) {
        return new VectorResponse(vector);
    }
}
