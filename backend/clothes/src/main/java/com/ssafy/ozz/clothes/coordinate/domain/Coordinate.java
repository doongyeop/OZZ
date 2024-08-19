package com.ssafy.ozz.clothes.coordinate.domain;

import com.ssafy.ozz.library.clothes.properties.Style;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toBits;

@Table
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Coordinate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long coordinateId;

    @Column(columnDefinition = "BIT(32)")
    private Integer style;

    @Column(length = 100)
    private String name;

    @Column
    @CreatedDate
    private LocalDateTime createdDate;

    @Column
    @LastModifiedDate
    private LocalDateTime updatedDate;

    @OneToMany(mappedBy = "coordinate")
    private List<CoordinateClothes> coordinateClothesList;

    /* FOREIGN KEY */
    private Long userId;
    private Long imageFileId;

    @Builder
    public Coordinate(Integer style, String name, Long userId, Long imageFileId) {
        this.style = style;
        this.name = name;
        this.userId = userId;
        this.imageFileId = imageFileId;
        this.coordinateClothesList = new ArrayList<>();
        this.createdDate = LocalDateTime.now();
        this.updatedDate = LocalDateTime.now();
    }

    //== 비즈니스 로직 ==//
    public void updateName(String name) {
        if(name != null) this.name = name;
    }

    public void updateStyle(List<Style> styleList) {
        if(styleList != null) this.style = toBits(styleList);
    }

    public void setCoordinateClothesList(List<CoordinateClothes> coordinateClothesList) {
        // 실제 DB 상에서 변경은 안됨
        if(coordinateClothesList != null) this.coordinateClothesList = coordinateClothesList;
    }
}
