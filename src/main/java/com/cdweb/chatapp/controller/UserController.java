package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String hello(){
        return "home page";
    }
    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/user")
    public String helloUser(){
        return "Hello user";
    }

    @PostMapping("/register")
    public String addNewUser(@RequestBody User newUser) {
        BCryptPasswordEncoder pwEncoder = new BCryptPasswordEncoder();
        String pwEncoded = pwEncoder.encode(newUser.getPassword());
        newUser.setPassword(pwEncoded);
         userService.addNewUser(newUser);
        return "hello";
    }


    @GetMapping("/getUser")
    public List<User> getAllUsers() {
        return userService.getAllUser();
    }

}
