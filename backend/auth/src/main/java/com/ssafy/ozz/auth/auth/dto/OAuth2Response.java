package com.ssafy.ozz.auth.auth.dto;

public interface OAuth2Response {

    String getProvider();
    String getProviderId();
    String getEmail();
    String getName();
    String getPhoneNumber();
    String getBirthYear();
    String getBirthDay();
    String getProfileImageUrl();
}
