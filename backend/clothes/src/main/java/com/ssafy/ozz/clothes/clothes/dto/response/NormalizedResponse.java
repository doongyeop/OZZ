package com.ssafy.ozz.clothes.clothes.dto.response;

import java.util.List;

public record NormalizedResponse (
        int index,
        List<NormalizedItem> data
){}

