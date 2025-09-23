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
class FriendRequestControllerTest {

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

    @Test
    void testSendAndRespondToFriendRequest() throws Exception {
        // Send request
        String response = mockMvc.perform(post("/api/friends/request")
                        .param("senderUsername", "alice")
                        .param("receiverUsername", "bob"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("PENDING"))
                .andReturn().getResponse().getContentAsString();

        // Extract requestId
        long requestId = new com.fasterxml.jackson.databind.ObjectMapper()
                .readTree(response).get("id").asLong();

        // Respond to request
        mockMvc.perform(post("/api/friends/respond")
                        .param("requestId", String.valueOf(requestId))
                        .param("status", "ACCEPTED"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ACCEPTED"));
    }
}
