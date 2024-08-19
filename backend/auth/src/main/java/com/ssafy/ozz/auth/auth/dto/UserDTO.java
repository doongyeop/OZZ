package com.ssafy.ozz.auth.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Getter
@Builder(toBuilder = true)
public class UserDTO {

    private Long id;
    private String role;
    private String name;
    private String phoneNumber;

    @NotBlank(message = "닉네임을 입력해주세요.")
    @Size(min = 2, max = 15, message = "닉네임은 2자 이상 15자 이하로 입력해주세요.")
    private String nickname;

    private String email;
    private Date birth;
//    private String provider; 안쓰는 항목 제거
//    private String userIdFromProvider; // 소셜에서 제공하는 유저 id

}
