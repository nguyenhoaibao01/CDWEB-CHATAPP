package com.cdweb.chatapp.model;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


public class Room {
    private String id;
    private String name;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private User admin;
    private List<User> member;
}
