package com.ssafy.ozz.clothes.clothes.dto.request;

public record VectorRequest (
        String text
){
    public static VectorRequest of(String text) {
        return new VectorRequest(text);
    }
}
