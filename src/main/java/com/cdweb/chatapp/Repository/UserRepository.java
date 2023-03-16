package com.cdweb.chatapp.Repository;

import com.cdweb.chatapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
