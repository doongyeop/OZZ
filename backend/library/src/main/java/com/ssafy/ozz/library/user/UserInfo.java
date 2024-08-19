package com.ssafy.ozz.library.user;

import java.util.Date;

public record UserInfo(
        Long userId,
        String nickname,
        Long profileFileId,
        Date Birth
) {
}
