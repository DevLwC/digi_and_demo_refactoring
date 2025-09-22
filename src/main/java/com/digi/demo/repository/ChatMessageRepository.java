package com.digi.demo.repository;

import com.digi.demo.entity.ChatMessage;
import com.digi.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>{
    @Query("SELECT m FROM ChatMessage m WHERE (m.sender = :user1 AND m.receiver = :user2) OR (m.sender = :user2 AND m.receiver = :user1) ORDER BY m.timestamp")
    List<ChatMessage> findChatBetweenUsers(@Param("user1") User user1, @Param("user2") User user2);
}
