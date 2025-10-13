package com.digi.demo.controller;

import com.digi.demo.entity.AvatarImage;
import com.digi.demo.entity.User;
import com.digi.demo.repository.AvatarImageRepository;
import com.digi.demo.repository.UserRepository;
import com.digi.demo.entity.Post;
import com.digi.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AvatarImageRepository avatarImageRepository;
    @Autowired
    private PostRepository postRepository;

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

    @GetMapping("/{id}/avatar")
    public ResponseEntity<?> getUserAvatar(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null || user.getAvatarImage() == null) {
            return ResponseEntity.notFound().build();
        }
        AvatarImage avatar = avatarImageRepository.findById(user.getAvatarImage().getId()).orElse(null);

        if (avatar == null) {
            return ResponseEntity.notFound().build();
        }
        String svg = new String(avatar.getImageData(), StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header("Content-Type", "image/svg+xml")
                .body(svg);
    }

    @GetMapping("/avatars/full")
    public ResponseEntity<?> getAllAvatarsWithData() {
        List<AvatarImage> avatars = avatarImageRepository.findAll();
        Map<String, String> avatarMap = avatars.stream()
                .collect(java.util.stream.Collectors.toMap(
                        AvatarImage::getName,
                        avatar -> new String(avatar.getImageData(), java.nio.charset.StandardCharsets.UTF_8)
                ));
        return ResponseEntity.ok(avatarMap);
    }


    @PostMapping("/updateAvatar")
    public ResponseEntity<?> updateAvatar(@RequestBody Map<String, String> body, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        String avatarAnimal = body.get("avatarAnimal");
        User user = userRepository.findByUsername(username).orElse(null);
        AvatarImage avatar = avatarImageRepository.findByName(avatarAnimal);
        if (user == null || avatar == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User or avatar not found"));
        }
        user.setAvatarImage(avatar);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Avatar updated successfully"));
    }

    @PostMapping("/bookmark")
    public ResponseEntity<?> bookmarkPost(@RequestBody Map<String, Long> body, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        Long postId = body.get("postId");
        User user = userRepository.findByUsername(username).orElse(null);
        Post post = postRepository.findById(postId).orElse(null);
        if (user == null || post == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User or post not found"));
        }
        user.getBookmarkedPosts().add(post);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Post bookmarked"));
    }

    @PostMapping("/unbookmark")
    public ResponseEntity<?> unbookmarkPost(@RequestBody Map<String, Long> body, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String username = authentication.getName();
        Long postId = body.get("postId");
        User user = userRepository.findByUsername(username).orElse(null);
        Post post = postRepository.findById(postId).orElse(null);
        if (user == null || post == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User or post not found"));
        }
        user.getBookmarkedPosts().remove(post);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Post unbookmarked"));
    }

    @GetMapping("/{id}/bookmarks")
    public ResponseEntity<?> getBookmarkedPosts(@PathVariable Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        return ResponseEntity.ok(user.getBookmarkedPosts());
    }

}
