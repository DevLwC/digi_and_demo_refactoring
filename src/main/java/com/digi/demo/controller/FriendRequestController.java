package com.digi.demo.controller;

import com.digi.demo.entity.FriendRequest;
import com.digi.demo.entity.User;
import com.digi.demo.repository.UserRepository;
import com.digi.demo.service.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendRequestController {
    @Autowired
    private FriendRequestService friendRequestService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/request")
    public FriendRequest sendRequest(@RequestParam String senderUsername, @RequestParam String receiverUsername) {
        User sender = userRepository.findByUsername(senderUsername).orElseThrow();
        User receiver = userRepository.findByUsername(receiverUsername).orElseThrow();
        return friendRequestService.sendRequest(sender, receiver);
    }

    @GetMapping("/requests")
    public List<FriendRequest> getPendingRequests(@RequestParam String receiverUsername) {
        User receiver = userRepository.findByUsername(receiverUsername).orElseThrow();
        return friendRequestService.getPendingRequests(receiver);
    }

    @PostMapping("/respond")
    public FriendRequest respondToRequest(@RequestParam Long requestId, @RequestParam String status) {
        FriendRequest.Status reqStatus = FriendRequest.Status.valueOf(status.toUpperCase());
        return friendRequestService.respondToRequest(requestId, reqStatus);
    }

    @GetMapping("/list")
    public List<FriendRequest> getFriends(@RequestParam String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return friendRequestService.getFriends(user);
    }
}
