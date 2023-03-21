package com.cdweb.chatapp.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.awt.*;
import java.util.Date;
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

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;
}
