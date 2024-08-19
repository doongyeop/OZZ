package com.ssafy.ozz.clothes.coordinate.domain;

import com.ssafy.ozz.clothes.clothes.domain.Clothes;
import jakarta.persistence.*;
import lombok.*;

@Table
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class CoordinateClothes {
    @EmbeddedId
    private CoordinateClothesId id;

    @MapsId("coordinateId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coordinate_id", nullable = false)
    private Coordinate coordinate;

    @MapsId("clothesId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothes_id", nullable = false)
    private Clothes clothes;

    @Column(columnDefinition = "tinyint(1)")
    private Integer offset;
}
