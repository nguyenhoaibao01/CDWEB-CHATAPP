package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.Repository.UserRepository;
import com.cdweb.chatapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Controller
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public String loginPage() {
        return "login";

    }

    @GetMapping("/register")
    public User addNewUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @PostMapping("process-register")
    public String register(User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encoded = passwordEncoder.encode((user.getPassword()));
        user.setPassword(encoded);
        userRepository.save(user);
        return "";
    }


}
