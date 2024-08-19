package com.ssafy.ozz.fileserver.file.dto.response;

import com.ssafy.ozz.fileserver.file.domain.Files;

public record FileInfoResponse(
        int fileId,
        String filePath,
        String fileName,
        String fileType
){
    public FileInfoResponse(Files file){
        this(file.getFileId(), file.getPath(), file.getName(),file.getType());
    }
}
