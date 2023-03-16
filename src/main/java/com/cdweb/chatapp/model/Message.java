package com.cdweb.chatapp.model;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
    private String id;
    private User sender, receiver;
    private DateTimeFormat sendAt;
    private String content;


}
