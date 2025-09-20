package com.digi.demo.repository;

import com.digi.demo.entity.ChatMessage;
import com.digi.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long>{
    List<ChatMessage> findBySenderAndReceiverOrReceiverAndSenderOrderByTimestamp(
        User sender1, User receiver1, User sender2, User receiver2
    );
}
