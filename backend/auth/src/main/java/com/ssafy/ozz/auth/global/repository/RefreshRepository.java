package com.ssafy.ozz.auth.global.repository;

import com.ssafy.ozz.auth.global.domain.Refresh;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshRepository extends CrudRepository<Refresh, String> {
    Refresh findByRefreshToken(String refreshToken);
    void deleteByRefreshToken(String refreshToken);
}
