package com.ssafy.ozz.fileserver.file.domain;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Table
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Files {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fileId;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(nullable = false)
    private String path;

    @Column(length = 25, nullable = false)
    private String type;

    @CreationTimestamp
    private LocalDateTime uploadDate;
}
