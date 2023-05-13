package com.cdweb.chatapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class User {
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
    @Column(length = 100000)
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
    @JsonIgnore
    private Set<Message> messages;
    @OneToMany(mappedBy = "admin")
    @JsonIgnore
    private Set<Room> room;
    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private Set<AddFriendRequest> addFriendRequestSender;
    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private Set<AddFriendRequest> addFriendRequestReceiver;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "rooms_members")
    @JsonIgnore
    private Set<Room> rooms = new HashSet<>();

    public void addRoom(Room r) {
        this.rooms.add(r);
    }
}

