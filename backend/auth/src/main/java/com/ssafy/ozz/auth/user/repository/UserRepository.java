package com.ssafy.ozz.auth.user.repository;

import com.ssafy.ozz.auth.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByNameAndPhoneNumber(String name, String phoneNumber);
}
