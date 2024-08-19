package com.ssafy.ozz.fileserver.file.service;

import com.ssafy.ozz.fileserver.file.dto.response.FileInfoResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

public interface FileService {
    FileInfoResponse saveFile(MultipartFile file) throws Exception;
    void deleteFile(long fileId) throws Exception;
    FileInfoResponse updateFile(long fileId, MultipartFile file) throws Exception;
    FileInfoResponse getFile(Long fileId);

    Resource loadFileAsResource(String fileName);
}