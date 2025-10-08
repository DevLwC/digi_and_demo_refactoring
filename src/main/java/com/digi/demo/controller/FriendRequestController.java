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
    public FriendRequest sendRequest(@RequestBody FriendRequestDto requestDto) {
        User sender = userRepository.findByUsername(requestDto.getSenderUsername()).orElseThrow();
        User receiver = userRepository.findByUsername(requestDto.getReceiverUsername()).orElseThrow();
        return friendRequestService.sendRequest(sender, receiver);
    }

    @GetMapping("/requests")
    public List<FriendRequestResponseDto> getPendingRequests(@RequestParam String receiverUsername) {
        User receiver = userRepository.findByUsername(receiverUsername).orElseThrow();
        List<FriendRequest> requests = friendRequestService.getPendingRequests(receiver);
        return requests.stream()
                .map(req -> new FriendRequestResponseDto(
                        req.getId(),
                        req.getSender().getUsername(),
                        req.getSender().getEmail(),
                        req.getStatus().name()
                ))
                .toList();
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


    public static class FriendRequestDto {
        private String senderUsername;
        private String receiverUsername;

        public String getSenderUsername() { return senderUsername; }
        public void setSenderUsername(String senderUsername) { this.senderUsername = senderUsername; }
        public String getReceiverUsername() { return receiverUsername; }
        public void setReceiverUsername(String receiverUsername) { this.receiverUsername = receiverUsername; }
    }


    public static class FriendRequestResponseDto {
        private Long id;
        private String username;
        private String email;
        private String status;

        public FriendRequestResponseDto(Long id, String username, String email, String status) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.status = status;
        }

        public Long getId() { return id; }
        public String getUsername() { return username; }
        public String getEmail() { return email; }
        public String getStatus() { return status; }
    }


}