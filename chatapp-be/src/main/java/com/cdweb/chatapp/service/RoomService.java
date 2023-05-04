package com.cdweb.chatapp.service;

import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.repository.RoomRepository;
import com.cdweb.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;

    public Room findById(long id) {
        return roomRepository.findById(id).get();
    }

    public void createNewRoom(Room room) {
        roomRepository.save(room);
    }

    public ArrayList<Room> getAllMyRooms(String username) {
//        return null;
        return new ArrayList<>(userRepository.findByEmail(username).get().getRooms());
    }

    public List<User> getMembersInRoom(long id) {
        Room room = findById(id);
        return new ArrayList<>(room.getMembers());
    }

}
