package com.ssafy.ozz.clothes.coordinate.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EqualsAndHashCode
@Embeddable
public class CoordinateClothesId implements Serializable {
    private Long coordinateId;
    private Long clothesId;
}