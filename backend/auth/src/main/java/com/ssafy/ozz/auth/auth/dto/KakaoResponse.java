package com.ssafy.ozz.auth.auth.dto;

import java.util.Map;

public class KakaoResponse implements OAuth2Response {
    private final Map<String, Object> attributes;
    private final Map<String, Object> kakaoAccount;
    private final Map<String, Object> properties;

    // 경고무시
    @SuppressWarnings("unchecked")
    public KakaoResponse(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        this.properties = (Map<String, Object>) attributes.get("properties");
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getProfileImageUrl() {
        return properties.get("profile_image") != null ? properties.get("profile_image").toString() : "";
    }

    @Override
    public String getEmail() {
        return kakaoAccount.get("email") != null ? kakaoAccount.get("email").toString() : "";
    }

    @Override
    public String getName() {
        return kakaoAccount.get("name") != null ? kakaoAccount.get("name").toString() : "";
    }

    @Override
    public String getPhoneNumber() {
        return kakaoAccount.get("phone_number") != null ? kakaoAccount.get("phone_number").toString() : "";
    }

    @Override
    public String getBirthYear() {
        return kakaoAccount.get("birthyear") != null ? kakaoAccount.get("birthyear").toString() : "";
    }

    @Override
    public String getBirthDay() {
        return kakaoAccount.get("birthday") != null ? kakaoAccount.get("birthday").toString() : "";
    }

}
