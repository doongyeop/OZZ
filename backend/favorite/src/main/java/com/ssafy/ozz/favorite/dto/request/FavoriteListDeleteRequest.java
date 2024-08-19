package com.ssafy.ozz.favorite.dto.request;

import java.util.List;

public record FavoriteListDeleteRequest(
    List<Long> coordinateIdList
){
}
