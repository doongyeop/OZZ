package com.ssafy.ozz.user.service;

import com.ssafy.ozz.user.domain.User;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserById(Long id);

    User updateUser(Long id, User updatedUser);

    User updateProfileImg(Long id, User updatedUser);

    void deleteUser(Long id);

    Boolean existsByNickname(String nickname);
}
