package com.digi.demo.controller;

import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String username) {
        return userRepository.findAll().stream()
                .filter(u -> u.getUsername().toLowerCase().contains(username.toLowerCase()))
                .toList();
    }

    @PostMapping("/updateBio")
    public ResponseEntity<?> updateBio(@RequestBody Map<String, String> body, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        String bio = body.get("bio");
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        user.setBio(bio);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Bio updated successfully"));
    }

    @PostMapping("/updateLocation")
    public ResponseEntity<?> updateLocation(@RequestBody Map<String, String> body, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        String location = body.get("location");
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        user.setLocation(location);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Location updated successfully"));
    }
}
