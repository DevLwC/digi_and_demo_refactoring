package com.digi.demo.service;

import com.digi.demo.entity.ChatMessage;
import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ChatMessageServiceTest {

    @Autowired
    private ChatMessageService chatMessageService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSendAndGetChat() {
        User sender = userRepository.save(new User("alice", "pass", "alice@example.com"));
        User receiver = userRepository.save(new User("bob", "pass", "bob@example.com"));

        ChatMessage sent = chatMessageService.sendMessage(sender, receiver, "Hello Bob!");
        assertNotNull(sent.getId());
        assertEquals("Hello Bob!", sent.getContent());

        List<ChatMessage> chat = chatMessageService.getChat(sender, receiver);
        assertEquals(1, chat.size());
        assertEquals("Hello Bob!", chat.get(0).getContent());
    }
}
