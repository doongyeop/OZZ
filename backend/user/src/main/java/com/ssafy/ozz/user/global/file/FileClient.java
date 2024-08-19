package com.ssafy.ozz.user.global.file;

import com.ssafy.ozz.user.global.config.FeignSupportConfig;
import com.ssafy.ozz.user.global.file.dto.FeignFileInfo;
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
    Optional<FeignFileInfo> uploadFile(@RequestPart("file") MultipartFile file);

    @GetMapping("/{fileId}")
    Optional<FeignFileInfo> getFile(@PathVariable("fileId") Long fileId);
}
