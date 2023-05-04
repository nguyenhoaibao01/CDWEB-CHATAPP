package com.cdweb.chatapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private User sender;
    @ManyToOne()
    @JsonIgnore
    private Room room;
    @Enumerated(EnumType.STRING)
    private MessageType messageType;
    @Column
    private LocalDateTime sendAt;
    @Column
    private String content;



}
