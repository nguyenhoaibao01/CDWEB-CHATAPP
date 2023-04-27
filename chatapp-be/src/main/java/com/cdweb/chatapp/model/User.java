package com.cdweb.chatapp.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "users")
public class User  {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long id;

    @Id
    private String email;
    @Column()
    private String name;
    @Column()
    private String password;
    @Column()
    private Date birthday;
    @Column()
    private String phone;

    @Column()
    private String address;
    @Column()
    private String avatarUrl;
    @Column()
    private String desc;
    @Column()
    private String token;
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
    @OneToMany(mappedBy = "sender")
    private Set<AddFriendRequest> addFriendRequestSender;
    @OneToMany(mappedBy = "receiver")
    private Set<AddFriendRequest> addFriendRequestReceiver;
    @ManyToMany(mappedBy = "members")
    private Set<Room> rooms= new HashSet<>();


}

