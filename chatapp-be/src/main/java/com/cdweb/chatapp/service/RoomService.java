package com.cdweb.chatapp.service;

import com.cdweb.chatapp.dto.RoomDto;
import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.repository.RoomRepository;
import com.cdweb.chatapp.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {


    private final ModelMapper mapper= new ModelMapper();
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

    public ArrayList<RoomDto> getAllMyRooms(String username) {
        ArrayList<Room> rooms = new ArrayList<>(userRepository.findByEmail(username).get().getRooms());
        ArrayList<RoomDto> roomDtos = new ArrayList<>();
        for (int i = 0; i < rooms.size(); i++) {
//          RoomDto roomDto=  mapper.map(rooms.get(i), RoomDto.class);
          roomDtos.add(mapper.map(rooms.get(i), RoomDto.class));
        }
        return roomDtos;
    }

    public List<User> getMembersInRoom(long id) {
        Room room = findById(id);
        return new ArrayList<>(room.getMembers());
    }

}
