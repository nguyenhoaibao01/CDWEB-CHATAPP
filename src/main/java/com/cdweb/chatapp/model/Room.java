package com.cdweb.chatapp.model;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Room {
    private String id;
    private String name;
    private Date createAt;
    private Date updateAt;
    private User admin;
    private List<User> member;
}
