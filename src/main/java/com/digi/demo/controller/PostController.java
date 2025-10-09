package com.digi.demo.controller;

import com.digi.demo.entity.FriendRequest;
import com.digi.demo.entity.Post;
import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import com.digi.demo.service.AIValidationService;
import com.digi.demo.service.FriendRequestService;
import com.digi.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FriendRequestService friendRequestService;

    private final AIValidationService aiValidationService;
    @Autowired
    public PostController(AIValidationService aiValidationService) {
        this.aiValidationService = aiValidationService;
    }

    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public Post createPost(
            @RequestParam String authorUsername,
            @RequestParam String content,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {


        var validatePost = aiValidationService.validateContent(content);
        var validateFacts = aiValidationService.validateFactAccuracy(content);

        if (!validatePost.isValid() || !validateFacts.isValid()) {
            throw new IllegalArgumentException("Post content is not valid: " + String.join(", ", validatePost.getViolationReasons()) + "; " + String.join(", ", validateFacts.getViolationReasons()));
        }

        //ToDo: emotionale Intelligenz in die Datenbank speichern
        //ToDo: dem User validePost.getViolationReasons() und validateFacts.getViolationReasons() anzeigen

        User author = userRepository.findByUsername(authorUsername).orElseThrow();
        byte[] imageData = null;
        if (image != null && !image.isEmpty()) {
           imageData = image.getBytes();
        }
        return postService.createPost(author, content, imageData);
    }

    // !IMPORTANT maybe the feed should be paginated in a real app/ limited to number or receent posts
    @GetMapping("/feed")
    public List<Post> getFeed(@RequestParam String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        List<FriendRequest> friends = friendRequestService.getFriends(user);
        List<User> friendUsers = new ArrayList<>();
        for (FriendRequest fr : friends) {
            if (fr.getSender().equals(user)) {
                friendUsers.add(fr.getReceiver());
            } else {
                friendUsers.add(fr.getSender());
            }
        }
        List<Post> feed = new ArrayList<>();
        feed.addAll(postService.getPostsByFriends(friendUsers));
        friendUsers.add(user);
        feed.addAll(postService.getPostsByOthers(friendUsers));
        return feed;
    }

    @GetMapping("/ownPosts")
    public ResponseEntity<List<Post>> getOwnPosts(@RequestParam String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        List<Post> posts = postService.getPostByUser(user);
        return ResponseEntity.ok(posts);
    }
}
