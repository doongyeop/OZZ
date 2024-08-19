package com.ssafy.ozz.board.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "boards")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder(toBuilder = true)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "boards_id")
    private Long id;

    private String content;

    @Column(name = "users_id")
    private Long userId; // 외래키

    @Column(name = "image_file_id")
    private Long imgFileId; // 외래키

    private int age;

    @Column(columnDefinition = "BIT(32)")
    private Integer style;

    @Column(name = "numlikes")
    private int likes;

    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @JsonManagedReference
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardLikes> boardLikes;

    @JsonManagedReference
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tag> tags;

    @Column(name = "coordinate_id")
    private Long coordinateId; // 외래키

    @PrePersist
    protected void onCreate() {
        createdDate = new Date();
    }

}
