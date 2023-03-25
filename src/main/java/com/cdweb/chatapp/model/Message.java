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
//@Entity
//@Table(name = "messages")
public class Message {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    //    @Column(name = "sender_id")
//    @ManyToOne()
//    @JoinColumn(name = "sender_id")
    private User sender;
//    @Column
    private int room;
//    @Column
    private LocalDateTime sendAt;
//    @Column
    private String content;


}
