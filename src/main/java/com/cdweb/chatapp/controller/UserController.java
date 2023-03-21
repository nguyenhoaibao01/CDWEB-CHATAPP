package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.DTO.LoginDTO;
import com.cdweb.chatapp.Repository.UserRepository;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public User addNewUser(@RequestBody User newUser) {
        BCryptPasswordEncoder pwEncoder = new BCryptPasswordEncoder();
        String pwEncoded = pwEncoder.encode(newUser.getPassword());
        newUser.setPassword(pwEncoded);
        return userService.addNewUser(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticationUser(@RequestBody LoginDTO loginDTO)  {
        Authentication authentication= authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(),loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return new ResponseEntity<>("Login successfully!", HttpStatus.OK);
    }


}
