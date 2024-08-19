package com.ssafy.ozz.auth.auth.service;

import com.ssafy.ozz.auth.auth.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final UserDTO userDTO;

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of(
                "email", userDTO.getEmail(),
                "birth", userDTO.getBirth(),
                "name", userDTO.getBirth(),
                "phoneNumber", userDTO.getPhoneNumber()
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(); // 적절한 권한을 반환
    }

    @Override
    public String getName() {
        return userDTO.getEmail();
    }

    public Long getId() {
        return userDTO.getId();
    }
}
