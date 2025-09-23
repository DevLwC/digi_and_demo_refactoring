package com.digi.demo.service;

import com.digi.demo.entity.FriendRequest;
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
class FriendRequestServiceTest {

    @Autowired
    private FriendRequestService friendRequestService;

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSendAndRespondToRequest() {
        User sender = userRepository.save(new User("alice", "pass", "alice@example.com"));
        User receiver = userRepository.save(new User("bob", "pass", "bob@example.com"));

        FriendRequest request = friendRequestService.sendRequest(sender, receiver);
        assertNotNull(request.getId());
        assertEquals(FriendRequest.Status.PENDING, request.getStatus());

        FriendRequest updated = friendRequestService.respondToRequest(request.getId(), FriendRequest.Status.ACCEPTED);
        assertEquals(FriendRequest.Status.ACCEPTED, updated.getStatus());
    }

    @Test
    void testGetPendingRequests() {
        User sender = userRepository.save(new User("alice", "pass", "alice@example.com"));
        User receiver = userRepository.save(new User("bob", "pass", "bob@example.com"));

        friendRequestService.sendRequest(sender, receiver);
        List<FriendRequest> pending = friendRequestService.getPendingRequests(receiver);
        assertEquals(1, pending.size());
    }
}
