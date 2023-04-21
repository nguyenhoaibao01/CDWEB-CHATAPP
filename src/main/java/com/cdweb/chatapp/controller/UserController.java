package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.dto.LoginRequest;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.JwtService;
import com.cdweb.chatapp.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/auth")
    public String authAndGetToken(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token;
        if (authentication.isAuthenticated()) {
             token = jwtService.generateToken(loginRequest.getUsername());
            return token;

        } else throw new UsernameNotFoundException("invalid user request!");



//        String jwt = jwtProvider.generateJwtToken(authentication);

    }


    @GetMapping("/register")
    public String addNewUser(@RequestBody User newUser, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        return userService.register(newUser, getSiteURL(request));
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code, HttpServletResponse httpServletResponse) throws IOException {
        if (userService.verify(code)) {
            httpServletResponse.sendRedirect("http://localhost:8080/login");
            return "verify success";
        }
        return "verify false";
    }

//    =====================================================================================================

    @GetMapping("/user")
    public String helloUser(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    @GetMapping("/hello")
    public String helloPage() {
        System.out.println("hâhaa");
        return "hello";
    }

    @GetMapping("/users")
    public List<User> getAllUsers(Authentication a, HttpServletRequest request) {
        System.out.println("hâhaa");
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUser(@PathVariable String id) {
        return userService.findById(Long.parseLong(id));
    }

}
