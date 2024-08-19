package com.ssafy.ozz.fileserver.file.controller;

import com.ssafy.ozz.fileserver.file.service.FileService;
import com.ssafy.ozz.fileserver.global.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/file")
public class FileController {
    private final FileService fileService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> upload(@RequestPart("file") MultipartFile file) throws Exception {
        return ResponseEntity.ok(fileService.saveFile(file));
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<?> delete(@PathVariable("fileId")long fileId) throws Exception {
        fileService.deleteFile(fileId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(path="/{fileId}",consumes = "multipart/form-data")
    public ResponseEntity<?> update(@PathVariable("fileId")long fileId, @RequestParam("file")MultipartFile file) throws Exception {
        return ResponseEntity.ok().body(fileService.updateFile(fileId, file));
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<?> getFile(@PathVariable("fileId") Long fileId) {
        return ResponseEntity.ok().body(fileService.getFile(fileId));
    }

    @GetMapping("/download/{filePath}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filePath) {
        Resource resource = fileService.loadFileAsResource(filePath);
        if (resource.exists() || resource.isReadable()) {
            String encodedFileName = URLEncoder.encode(filePath, StandardCharsets.UTF_8).replace("+", "%20");

            String contentType = "image/" + FileUtil.getFileExt(filePath);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"")
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
