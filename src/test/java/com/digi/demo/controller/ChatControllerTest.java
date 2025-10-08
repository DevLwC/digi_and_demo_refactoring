package com.digi.demo.controller;

import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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
class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    private User alice, bob;

    @BeforeEach
    void setup() {
        alice = userRepository.save(new User("alice", "pass", "alice@example.com"));
        bob = userRepository.save(new User("bob", "pass", "bob@example.com"));
    }

    @WithMockUser(username = "alice")
    @Test
    void testSendMessageAndGetChat() throws Exception {
        mockMvc.perform(post("/api/chat/send")
                        .param("senderUsername", "alice")
                        .param("receiverUsername", "bob")
                        .param("content", "Hi Bob!"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Hi Bob!"));

        mockMvc.perform(get("/api/chat/messages")
                        .param("user1", "alice")
                        .param("user2", "bob"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("Hi Bob!"));
    }
}
