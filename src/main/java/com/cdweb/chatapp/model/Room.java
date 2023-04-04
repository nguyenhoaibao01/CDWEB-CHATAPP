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
    @Column
    private LocalDateTime createAt = LocalDateTime.now();
    @Column
    private LocalDateTime updateAt = LocalDateTime.now();

    @ManyToMany
    private Set<User> members= new HashSet<>();

    @OneToMany
    private Set<Message> messages= new HashSet<>();
}
