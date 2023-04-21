package com.cdweb.chatapp.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne()
    private User sender;
    @ManyToOne()
    private Room room;
    @Column
    private LocalDateTime sendAt=LocalDateTime.now();
    @Column
    private String content;



}
