package com.digi.demo.service;

import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(String username, String password, String email) {
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);

        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public void updateLoginStreak(User user) {
        LocalDate lastLogin = user.getLastLoginDate().toLocalDate();
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        if (lastLogin.isEqual(yesterday)) {
            user.setStreakCount(user.getStreakCount() + 1);
        } else if (!lastLogin.isEqual(today)) {
            user.setStreakCount(1);
        }
        user.setLastLoginDate(LocalDateTime.now());
        userRepository.save(user);
    }
}
