package com.ssafy.ozz.favorite.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "favorite_group")
public class FavoriteGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_group_id")
    private Long id;

    @Column(name = "favorite_group_name")
    private String name;

    @Column
    private Long userId;

    @OneToMany(mappedBy = "favoriteGroup")
    private List<Favorite> favorites;

    @Builder
    public FavoriteGroup(String name, Long userId) {
        this.name = name;
        this.userId = userId;
        this.favorites = new ArrayList<>();
    }
}
