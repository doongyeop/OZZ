package com.ssafy.ozz.board.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tags")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder(toBuilder = true)
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tags_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boards_id")
    @JsonBackReference
    private Board board;

    @Column(name = "x_position")
    private double xPosition;

    @Column(name = "y_position")
    private double yPosition;

    @Column(name = "clothes_id")
    private Long clothesId;
}
