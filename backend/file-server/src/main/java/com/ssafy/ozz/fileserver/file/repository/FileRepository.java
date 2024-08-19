package com.ssafy.ozz.fileserver.file.repository;

import com.ssafy.ozz.fileserver.file.domain.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<Files, Long> {
}
