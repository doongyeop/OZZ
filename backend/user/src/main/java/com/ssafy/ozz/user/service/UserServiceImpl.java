package com.ssafy.ozz.user.service;

import com.ssafy.ozz.user.domain.User;
import com.ssafy.ozz.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            User updated = user.toBuilder()
                    .nickname(updatedUser.getNickname())
                    .birth(updatedUser.getBirth())
                    .build();
            return userRepository.save(updated);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfileImg(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            User updated = user.toBuilder()
                    .profileFileId(updatedUser.getProfileFileId())
                    .build();
            return userRepository.save(updated);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Boolean existsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}
