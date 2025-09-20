package com.digi.demo.service;

import com.digi.demo.entity.FriendRequest;
import com.digi.demo.entity.User;
import com.digi.demo.repository.FriendRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FriendRequestService {
    @Autowired
    private FriendRequestRepository friendRequestRepository;

    public FriendRequest sendRequest(User sender, User receiver) {
        FriendRequest request = new FriendRequest();
        request.setSender(sender);
        request.setReceiver(receiver);
        request.setStatus(FriendRequest.Status.PENDING);
        return friendRequestRepository.save(request);
    }

    public List<FriendRequest> getPendingRequests(User receiver) {
        return friendRequestRepository.findByReceiverAndStatus(receiver, FriendRequest.Status.PENDING);
    }

    public FriendRequest respondToRequest(Long requestId, FriendRequest.Status status) {
        FriendRequest request = friendRequestRepository.findById(requestId).orElseThrow();
        request.setStatus(status);
        return friendRequestRepository.save(request);
    }

    public List<FriendRequest> getFriends(User user) {
        return friendRequestRepository.findBySenderOrReceiverAndStatus(user, user, FriendRequest.Status.ACCEPTED);
    }
}
