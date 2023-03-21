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
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    private User sender; // in database, this field is senderId with type String
//    @Column(name = "receiver_id")
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    private User receiver;
//    @Column
    private LocalDateTime sendAt;
//    @Column
    private String content;


}
