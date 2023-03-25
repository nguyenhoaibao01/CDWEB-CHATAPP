package com.cdweb.chatapp.service;

import com.cdweb.chatapp.Repository.UserRepository;
import com.cdweb.chatapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<User> findByEmail (String email){
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
