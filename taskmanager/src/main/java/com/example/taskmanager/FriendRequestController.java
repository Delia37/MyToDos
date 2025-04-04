package com.example.taskmanager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends")
public class FriendRequestController {

    @Autowired
    private FriendRequestRepository friendRequestRepo;

    @Autowired
    private UserRepository userRepository;

    // Send friend request
    @PostMapping("/request")
    public ResponseEntity<String> sendRequest(@RequestBody FriendRequestDto requestDto) {
        if (requestDto.senderId().equals(requestDto.receiverId())) {
            return ResponseEntity.badRequest().body("Cannot send request to yourself.");
        }

        User sender = userRepository.findById(requestDto.senderId()).orElseThrow();
        User receiver = userRepository.findById(requestDto.receiverId()).orElseThrow();

        // Check if already friends
        if (sender.getFriends().contains(receiver)) {
            return ResponseEntity.badRequest().body("You are already friends.");
        }

        // Check if pending request already exists
        if (friendRequestRepo.existsBySenderIdAndReceiverIdAndStatus(
                requestDto.senderId(), requestDto.receiverId(), "PENDING")) {
            return ResponseEntity.badRequest().body("Friend request already sent.");
        }

        FriendRequest request = new FriendRequest(sender, receiver, "PENDING");
        friendRequestRepo.save(request);
        return ResponseEntity.ok("Request sent.");
    }


    // View incoming requests
    @GetMapping("/requests/{userId}")
    public List<FriendRequest> getPendingRequests(@PathVariable Long userId) {
        return friendRequestRepo.findByReceiverIdAndStatus(userId, "PENDING");
    }

    // Accept friend request
    @PutMapping("/request/{id}/accept")
    public String acceptRequest(@PathVariable Long id) {
        FriendRequest request = friendRequestRepo.findById(id).orElseThrow();
        request.setStatus("ACCEPTED");

        // Add each other as friends
        User sender = request.getSender();
        User receiver = request.getReceiver();
        sender.getFriends().add(receiver);
        receiver.getFriends().add(sender);

        userRepository.save(sender);
        userRepository.save(receiver);
        friendRequestRepo.save(request);

        return "Friend request accepted.";
    }

    // Reject friend request
    @PutMapping("/request/{id}/reject")
    public String rejectRequest(@PathVariable Long id) {
        FriendRequest request = friendRequestRepo.findById(id).orElseThrow();
        request.setStatus("REJECTED");
        friendRequestRepo.save(request);
        return "Friend request rejected.";
    }

    // Optional: View sent requests
    @GetMapping("/sent/{userId}")
    public List<FriendRequest> getSentRequests(@PathVariable Long userId) {
        return friendRequestRepo.findBySenderId(userId);
    }

    // Get list of friends for a user
    @GetMapping("/friends/{userId}")
    public List<User> getFriends(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return List.copyOf(user.getFriends());
    }

}

record FriendRequestDto(Long senderId, Long receiverId) {}
