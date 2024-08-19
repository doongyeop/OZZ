package com.ssafy.ozz.auth.auth.dto;

import java.util.Map;

public class NaverResponse implements OAuth2Response {
    private final Map<String, Object> attribute;

    public NaverResponse(Map<String, Object> attribute) {
        this.attribute = (Map<String, Object>) attribute.get("response");
    }

    @Override
    public String getProvider() {
        return "naver";
    }

    @Override
    public String getProviderId() {
        return attribute.get("id").toString();
    }

    @Override
    public String getEmail() {
        return attribute.get("email") != null ? attribute.get("email").toString() : "1234@ssafy.com";
    }

    @Override
    public String getName() {
        return attribute.get("name") != null ? attribute.get("name").toString() : "손민수";
    }

    @Override
    public String getPhoneNumber() {
        return attribute.get("mobile") != null ? attribute.get("mobile").toString() : "010-0000-0000";
    }

    @Override
    public String getBirthYear() {
        return attribute.get("birthyear") != null ? attribute.get("birthyear").toString() : "2000";
    }

    @Override
    public String getBirthDay() {
        return attribute.get("birthday") != null ? attribute.get("birthday").toString() : "1010";
    }

    @Override
    public String getProfileImageUrl() {
        return attribute.get("profile_image") != null ? attribute.get("profile_image").toString() : "x";
    }
}
