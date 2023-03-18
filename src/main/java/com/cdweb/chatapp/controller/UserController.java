package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.Repository.UserRepository;
import com.cdweb.chatapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
//@CrossOrigin
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;



    @GetMapping("/register")
    public User addNewUser(@RequestBody User newUser) {
        BCryptPasswordEncoder pwEncoder = new BCryptPasswordEncoder();
        String pwEncoded = pwEncoder.encode(newUser.getPassword());
        newUser.setPassword(pwEncoded);
        return userRepository.save(newUser);
    }




}
