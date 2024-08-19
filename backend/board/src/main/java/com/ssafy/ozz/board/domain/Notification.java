package com.ssafy.ozz.board.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "notifications")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder(toBuilder = true)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "notifications_id")
    private Long id;

    private String content;

    @Column(name = "is_read")
    private boolean read;

    @Column(name = "users_id")
    private Long userId;

    @JoinColumn(name = "boards_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Board board; // 외래키

    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @PrePersist
    protected void onCreate() {
        createdDate = new Date();
    }

}
