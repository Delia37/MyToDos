package com.example.taskmanager;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    List<FriendRequest> findByReceiverIdAndStatus(Long receiverId, String status);
    List<FriendRequest> findBySenderId(Long senderId);
    boolean existsBySenderIdAndReceiverIdAndStatus(Long senderId, Long receiverId, String status);
}
