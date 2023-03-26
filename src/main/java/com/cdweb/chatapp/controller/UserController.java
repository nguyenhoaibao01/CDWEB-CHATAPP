package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String hello() {
        return "home page";
    }

    @GetMapping("/user")
    public String helloUser() {
        return "Hello user";
    }

    @GetMapping("/register")
    public String addNewUser(@RequestBody User newUser, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        return userService.register(newUser, getSiteURL(request));
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUser();
    }

    @PostMapping("/getUser/{id}")
    public Optional<User> getUser(@PathVariable String id) {
        return userService.findById(Long.parseLong(id));
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code, HttpServletResponse httpServletResponse) throws IOException {
        if (userService.verify(code)) {
            httpServletResponse.sendRedirect("http://localhost:8080/login");
            return "verify success";
        }
        return "verify false";
    }
}
