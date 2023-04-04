package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Optional;

@Component
public class WebsocketEventListener {
    private static final Logger LOGGER = LoggerFactory.getLogger(WebsocketEventListener.class);
    @Autowired
    private SimpMessageSendingOperations messageSendingOperations;
    @Autowired
    private UserService userService;
    @EventListener
    public void handleWebSocketconnectListener(SessionConnectedEvent e){
        LOGGER.info("Da nhan 1 ket noi web socket moi");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent e){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(e.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if(username != null){
           User user =userService.findByEmail(username).get();
            LOGGER.info("Huy ket noi user: " + username);
            Message message = new Message();
            message.setSender(user);
            messageSendingOperations.convertAndSend("chatroom/public", message);
        }
    }
}
