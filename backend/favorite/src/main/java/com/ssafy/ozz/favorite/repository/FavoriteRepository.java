package com.ssafy.ozz.favorite.repository;

import com.ssafy.ozz.favorite.domain.Favorite;
import com.ssafy.ozz.favorite.domain.FavoriteGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findAllByFavoriteGroup(FavoriteGroup favoriteGroup);
    Optional<Favorite> findByFavoriteGroupAndCoordinateId(FavoriteGroup favoriteGroup, Long coordinateId);
}
