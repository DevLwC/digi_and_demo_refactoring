package com.digi.demo.controller;

import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private User alice;

    @BeforeEach
    void setup() {
        alice = userRepository.save(new User("alice", "pass", "alice@example.com"));
    }

    @Test
    void testCreatePostAndGetFeed() throws Exception {
        mockMvc.perform(post("/api/posts/create")
                        .param("authorUsername", "alice")
                        .param("content", "My first post!"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("My first post!"));

        userRepository.save(new User("bob", "pass", "bob@example.com"));

        mockMvc.perform(get("/api/posts/feed")
                        .param("username", "bob"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("My first post!"));
    }

    @Test
    void testUserDoesNotSeeOwnPostInFeed() throws Exception {
        mockMvc.perform(post("/api/posts/create")
                        .param("authorUsername", "alice")
                        .param("content", "Alice's post"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Alice's post"));

        mockMvc.perform(get("/api/posts/feed")
                        .param("username", "alice"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }
}
