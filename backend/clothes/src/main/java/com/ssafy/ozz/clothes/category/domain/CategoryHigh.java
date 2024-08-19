package com.ssafy.ozz.clothes.category.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class CategoryHigh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Byte categoryHighId;

    @Column(length = 30)
    String name;

    @OneToMany
    @JoinColumn(name="category_high_id")
    List<CategoryLow> categoryLowList;
}
