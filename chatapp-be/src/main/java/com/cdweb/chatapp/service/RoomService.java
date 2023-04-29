package com.cdweb.chatapp.service;

import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public void createNewRoom(Room room){
        roomRepository.save(room);
    }

}
