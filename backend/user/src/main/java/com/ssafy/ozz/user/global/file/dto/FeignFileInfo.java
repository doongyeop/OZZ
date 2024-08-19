package com.ssafy.ozz.user.global.file.dto;

public record FeignFileInfo(
        Long fileId,
        String filePath,
        String fileName,
        String fileType
){
}
