package com.digi.demo.service;

import com.digi.demo.entity.Post;
import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class PostServiceTest {

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testCreateAndGetPosts() {
        User author = userRepository.save(new User("alice", "pass", "alice@example.com"));
        Post post = postService.createPost(author, "Hello world!");
        assertNotNull(post.getId());
        assertEquals("Hello world!", post.getContent());

        List<Post> posts = postService.getPostsByFriends(Collections.singletonList(author));
        assertFalse(posts.isEmpty());
    }
}
