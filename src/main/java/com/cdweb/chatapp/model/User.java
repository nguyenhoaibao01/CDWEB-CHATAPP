package com.cdweb.chatapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
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
    @Column(nullable = false)
    private String role;
    @Column()
    private String verificationCode;
    @Column(nullable = false)
    private boolean enable;
    @OneToMany(mappedBy = "sender")
    private Set<Message> messages;

    @OneToMany(mappedBy = "admin")
    private Set<Room> room;

    @ManyToMany(mappedBy = "members")
    private Set<Room> rooms= new HashSet<>();
}

