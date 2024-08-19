package com.ssafy.ozz.fileserver.file.service;

import com.ssafy.ozz.fileserver.file.domain.Files;
import com.ssafy.ozz.fileserver.file.dto.response.FileInfoResponse;
import com.ssafy.ozz.fileserver.file.exception.FileNotFoundException;
import com.ssafy.ozz.fileserver.file.exception.UnsupportedFormatException;
import com.ssafy.ozz.fileserver.file.repository.FileRepository;
import com.ssafy.ozz.fileserver.global.util.FileUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import static com.ssafy.ozz.fileserver.global.util.FileUtil.getFileExt;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
    @Value("${file.upload-dir}")
    private String uploadDir;

    private final FileRepository fileRepository;

    @Transactional()
    public FileInfoResponse saveFile(MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String storedFileName = UUID.randomUUID()+ "." + originalFileName;

        if (!FileUtil.isImageFile(originalFileName)) {
            throw new UnsupportedFormatException();
        }
        File saveFile = new File(uploadDir, storedFileName);
        file.transferTo(saveFile.toPath());

        String ext = getFileExt(originalFileName);
        Files fileEntity = Files.builder()
                .type("image/"+ext)
                .name(originalFileName)
                .path(storedFileName).build();
        fileRepository.save(fileEntity);

        return new FileInfoResponse(fileEntity);
    }

    @Transactional()
    public void deleteFile(long fileId) {
        //TODO : 폴더에서 파일 삭제 - db에 접근해서 path값에 접근을 해야하는데...
        fileRepository.deleteById(fileId);
    }

    @Transactional
    public FileInfoResponse updateFile(long fileId, MultipartFile file) throws Exception {
        Files oldFileEntity = fileRepository.findById(fileId).orElseThrow();
        File oldFile = new File(uploadDir, oldFileEntity.getName());
        oldFile.deleteOnExit();
        String originalFileName = file.getOriginalFilename();
        String storedFileName = UUID.randomUUID() + "." + originalFileName;

        // 이미지 파일 체크
        if (!FileUtil.isImageFile(originalFileName)) {
            throw new UnsupportedFormatException();
        }

        File newFile = new File(uploadDir, storedFileName);
        file.transferTo(newFile.toPath());

        String ext = getFileExt(originalFileName);
        oldFileEntity.setType("image/"+ext);
        oldFileEntity.setName(originalFileName);
        oldFileEntity.setPath(storedFileName);

        return new FileInfoResponse(oldFileEntity);
    }

    @Override
    public FileInfoResponse getFile(Long fileId) {
        return new FileInfoResponse(fileRepository.findById(fileId).orElseThrow(FileNotFoundException::new));
    }

    @Override
    public Resource loadFileAsResource(String fileName) {
        Path path = Paths.get(uploadDir).resolve(fileName);
        try {
            return new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            throw new FileNotFoundException(e);
        }
    }

//
//
//    /**
//     * [중복방지를 위한 파일 고유명 생성]
//     * @param fileExtension 확장자
//     * @return String 파일 고유이름
//     */
//    private String generateUniqueFileName(String originalFileName) {
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
//        // Random 객체 생성
//        Random random = new Random();
//        // 0 이상 100 미만의 랜덤한 정수 반환
//        String randomNumber = Integer.toString(random.nextInt(Integer.MAX_VALUE));
//        String timeStamp = dateFormat.format(new Date());
//        return timeStamp + randomNumber + originalFileName;
}
