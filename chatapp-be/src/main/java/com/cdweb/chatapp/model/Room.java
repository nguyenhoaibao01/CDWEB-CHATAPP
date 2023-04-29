package com.cdweb.chatapp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column
    private String name;
    @Column
    private boolean isGroup;
    @ManyToOne
    private User admin;
//    @ManyToOne
//    private User updateBy;
    @Column
    private LocalDateTime createAt ;
    @Column
    private LocalDateTime updateAt;

    @ManyToMany
    private Set<User> members= new HashSet<>();

    @OneToMany
    private Set<Message> messages= new HashSet<>();

    public void addMember(User u){
        this.members.add(u);
    }

    public void addAllMember(Set<User> users){
        this.members.addAll(users);
    }
}
