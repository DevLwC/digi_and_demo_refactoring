package com.digi.demo.controller;

import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import com.digi.demo.service.AIValidationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
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

    @Autowired
    private AIValidationService aiValidationService;

    private User alice;

    @BeforeEach
    void setup() {
        alice = userRepository.save(new User("alice", "pass", "alice@example.com"));
    }

    // TODO: test need to be rewritten because of AI content validation and new complex error handling
    /*@WithMockUser(username = "alice")
    @Test
    void testCreatePostAndGetFeed() throws Exception {
        // Java
        mockMvc.perform(post("/api/posts/create")
                        .param("authorUsername", "alice")
                        .param("content", "Alice was born in 1990 and lives in Berlin."))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Alice was born in 1990 and lives in Berlin."));

        userRepository.save(new User("bob", "pass", "bob@example.com"));

        mockMvc.perform(get("/api/posts/feed")
                        .param("username", "bob"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("My first post!"));
    }*/

    /*@WithMockUser(username = "alice")
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
    }*/
}
