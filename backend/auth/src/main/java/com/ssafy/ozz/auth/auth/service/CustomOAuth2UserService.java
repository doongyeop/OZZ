package com.ssafy.ozz.auth.auth.service;

import com.ssafy.ozz.auth.auth.dto.KakaoResponse;
import com.ssafy.ozz.auth.auth.dto.NaverResponse;
import com.ssafy.ozz.auth.auth.dto.OAuth2Response;
import com.ssafy.ozz.auth.auth.dto.UserDTO;
import com.ssafy.ozz.auth.user.domain.User;
import com.ssafy.ozz.auth.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        } else {
            return null;
        }

        String name = oAuth2Response.getName();
        String phoneNumber = removeCountryCode(oAuth2Response.getPhoneNumber());
        Optional<User> optionalUser = userRepository.findByNameAndPhoneNumber(name, phoneNumber);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            UserDTO userDTO = UserDTO.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .birth(user.getBirth())
                    .name(user.getName())
                    .phoneNumber(user.getPhoneNumber())
                    .build();

            return new CustomOAuth2User(userDTO);

        } else {
            // new user
            String birthYear = oAuth2Response.getBirthYear();
            String birthDay = oAuth2Response.getBirthDay();
            Date birth = convertToBirthTimestamp(birthYear, birthDay);

            User user = User.builder()
                    .email(oAuth2Response.getEmail())
                    .birth(birth)
                    .name(name)
                    .phoneNumber(phoneNumber)
                    .build();

            userRepository.save(user);

            UserDTO userDTO = UserDTO.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .birth(user.getBirth())
                    .name(user.getName())
                    .phoneNumber(user.getPhoneNumber())
                    .build();

            return new CustomOAuth2User(userDTO);
        }
    }

    // yyyy-MM-dd 형식으로 변환
    private Timestamp convertToBirthTimestamp(String birthyear, String birthday) {
        if (birthday.length() == 4) { // 카카오는 조금 달라서 수정
            birthday = birthday.substring(0, 2) + "-" + birthday.substring(2, 4);
        }
        String birthDate = birthyear + "-" + birthday;
        LocalDate date = LocalDate.parse(birthDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        return Timestamp.valueOf(date.atStartOfDay());
    }

    private String removeCountryCode(String phoneNumber) {
        if (phoneNumber.startsWith("+82")) { // 카카오 형식 +82 10
            phoneNumber = "0" + phoneNumber.substring(4);
        }
        return phoneNumber;
    }
}
