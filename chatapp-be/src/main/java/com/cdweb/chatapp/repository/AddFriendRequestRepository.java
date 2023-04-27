package com.cdweb.chatapp.repository;

import com.cdweb.chatapp.model.AddFriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddFriendRequestRepository extends JpaRepository<AddFriendRequest, Long> {
}
