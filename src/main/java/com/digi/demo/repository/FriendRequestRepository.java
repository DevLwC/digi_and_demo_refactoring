package com.digi.demo.repository;

import com.digi.demo.entity.FriendRequest;
import com.digi.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long>{
    List<FriendRequest> findByReceiverAndStatus(User receiver, FriendRequest.Status status);
    List<FriendRequest> findBySenderAndStatus(User sender, FriendRequest.Status status);
    List<FriendRequest> findBySenderOrReceiverAndStatus(User sender, User receiver, FriendRequest.Status status);
}
