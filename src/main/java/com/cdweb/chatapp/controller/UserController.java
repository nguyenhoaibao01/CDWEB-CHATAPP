package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String hello(){
        return "home page";
    }

    @GetMapping("/user")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String helloUser(){
        return "Hello user";
    }

    @PostMapping("/register")
    public String addNewUser(@RequestBody User newUser) {
        Optional<User>  exist = userService.findByEmail(newUser.getEmail());
        if(!exist.isEmpty()) return "Email nay da ton tai!";
        BCryptPasswordEncoder pwEncoder = new BCryptPasswordEncoder();
        String pwEncoded = pwEncoder.encode(newUser.getPassword());
        newUser.setPassword(pwEncoded);
         userService.addNewUser(newUser);
        return "Ban da dang ky thanh cong!";
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUser();
    }

    @PostMapping("/getUser/{id}")
    public Optional<User> getUser(@PathVariable String id) {
        return userService.findById(Long.parseLong(id));
    }
}
