package com.ssafy.ozz.fileserver.global.util;

public class FileUtil {
    public static boolean isImageFile(String fileName){
        System.out.println(fileName);
        return fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") ||
                fileName.endsWith(".gif") || fileName.endsWith(".bmp") || fileName.endsWith(".webp");    }

    public static String getFileExt(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return "";
        }
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex == -1 || dotIndex == fileName.length() - 1) {
            return ""; // 확장자가 없는 경우
        }
        return fileName.substring(dotIndex + 1).toLowerCase();
    }
}
