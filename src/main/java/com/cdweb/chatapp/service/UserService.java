package com.cdweb.chatapp.service;

import com.cdweb.chatapp.Repository.UserRepository;
import com.cdweb.chatapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService{
    @Autowired
    private UserRepository userRepository;

    public User addNewUser(User newUser) {
        return userRepository.save(newUser);
    }
    public List<User> getAllUser() {
        return userRepository.findAll();
    }
}
