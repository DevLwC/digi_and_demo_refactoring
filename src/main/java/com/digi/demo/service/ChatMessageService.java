package com.digi.demo.service;

import com.digi.demo.entity.ChatMessage;
import com.digi.demo.entity.User;
import com.digi.demo.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatMessageService {
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public ChatMessage sendMessage(User sender, User receiver, String content) {
        ChatMessage message = new ChatMessage();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getChat(User user1, User user2) {
        return chatMessageRepository.findChatBetweenUsers(
            user1, user2
        );
    }
}
