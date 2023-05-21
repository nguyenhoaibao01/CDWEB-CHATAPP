package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.dto.Chat;
import com.cdweb.chatapp.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebsocketController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    @SendTo("/room/{id}")
    public Message sendMessage(@Payload Message message) {
        return message;
    }

    @MessageMapping("/sendMessage")
    @SendTo("/room/public")
    public Chat message(@Payload Chat chat) {
        return chat;
    }

}

