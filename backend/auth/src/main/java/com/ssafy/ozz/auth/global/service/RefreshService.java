package com.ssafy.ozz.auth.global.service;

import com.ssafy.ozz.auth.global.domain.Refresh;

public interface RefreshService {

    String createAndSaveRefreshToken(Long userId);
    void saveRefreshToken(String refreshToken);
    void deleteRefreshToken(String refreshToken);
    void deleteExistingRefreshToken(Long userId);
    Refresh findByRefreshToken(String refreshToken);

}
