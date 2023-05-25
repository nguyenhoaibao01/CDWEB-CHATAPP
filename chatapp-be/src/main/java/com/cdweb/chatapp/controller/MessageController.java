package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.model.Message;
import com.cdweb.chatapp.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.geom.GeneralPath;
import java.util.List;

@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/rooms/{id}/messages")
    public List<Message> loadMessages(@PathVariable long id){
        return null;
    }
}
