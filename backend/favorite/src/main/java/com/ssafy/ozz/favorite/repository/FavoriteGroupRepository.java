package com.ssafy.ozz.favorite.repository;

import com.ssafy.ozz.favorite.domain.FavoriteGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteGroupRepository extends JpaRepository<FavoriteGroup, Long> {
    List<FavoriteGroup> findByUserId(Long userId);
}
