package com.ssafy.ozz.clothes.global.fegin.file;

import com.ssafy.ozz.clothes.global.config.FeignSupportConfig;
import com.ssafy.ozz.library.file.FileInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@FeignClient(name = "ozz-file", path = "/api/file", configuration = FeignSupportConfig.class)
public interface FileClient {

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Optional<FileInfo> uploadFile(@RequestPart("file") MultipartFile file);

    @GetMapping("/{fileId}")
    Optional<FileInfo> getFile(@PathVariable("fileId") Long fileId);
}
