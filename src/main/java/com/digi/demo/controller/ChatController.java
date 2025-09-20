package com.digi.demo.controller;

import com.digi.demo.entity.ChatMessage;
import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import com.digi.demo.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatMessageService chatMessageService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestParam String senderUsername, @RequestParam String receiverUsername, @RequestParam String content) {
        User sender = userRepository.findByUsername(senderUsername).orElseThrow();
        User receiver = userRepository.findByUsername(receiverUsername).orElseThrow();
        return chatMessageService.sendMessage(sender, receiver, content);
    }

    @GetMapping("/messages")
    public List<ChatMessage> getChat(@RequestParam String user1, @RequestParam String user2) {
        User u1 = userRepository.findByUsername(user1).orElseThrow();
        User u2 = userRepository.findByUsername(user2).orElseThrow();
        return chatMessageService.getChat(u1, u2);
    }
}
