package com.ssafy.ozz.auth.user.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder(toBuilder = true)
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_id")
    private Long id;

    @Column(nullable = false, length = 31)
    private String email;

    @Column(unique = true)
    private String nickname;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date birth;

    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    // 외래키
    @Column(name = "profile_file_id", nullable = true)
    private Long profileFileId;

    @PrePersist // user entity가 저장될 때 현재 날짜로 설정
    protected void onCreate() {
        createdDate = new Date();
    }

}
