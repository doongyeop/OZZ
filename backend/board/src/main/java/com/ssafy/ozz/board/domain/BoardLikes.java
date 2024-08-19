package com.ssafy.ozz.board.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "board_likes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder(toBuilder = true)
@IdClass(BoardLikes.BoardLikesId.class) // 복합키 지정
public class BoardLikes {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boards_id", nullable = false)
    @JsonBackReference
    private Board board;

    @Id
    @Column(name = "users_id", nullable = false)
    private Long userId; // 외래키 + 복합키

    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    public Long getBoardId() {
        return board.getId();
    }

    @PrePersist
    protected void onCreate() {
        createdDate = new Date();
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BoardLikesId implements Serializable {
        private Long board;
        private Long userId;
    }
}
