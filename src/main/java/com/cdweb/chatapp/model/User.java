package com.cdweb.chatapp.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column()
    private String name;
    @Column()
    private String password;
    @Column()
    private Date birthday;
    @Column()
    private String phone;
    @Column()
    private String email;
    @Column()
    private String address;
    @Column()
    private String avatarUrl;
    @Column()
    private String desc;
//    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private String role;
    @Column()
    private String verificationCode;
    @Column(nullable = false)
    private boolean enable;
//@OneToMany(mappedBy = "user")
//    @Column
//    private Set<Message> messages;
}

