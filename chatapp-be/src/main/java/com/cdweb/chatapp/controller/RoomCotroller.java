package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.dto.GroupChatDto;
import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.model.User;
import com.cdweb.chatapp.service.JwtService;
import com.cdweb.chatapp.service.RoomService;
import com.cdweb.chatapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/chatapp.api")
public class RoomCotroller {

    @Autowired
    private RoomService roomService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;

    @GetMapping("/rooms")
    public List<Room> getAllMyRooms(@RequestHeader("Authorization") String bearerToken) {
        String username = jwtService.extractUsername(bearerToken.substring(7));
        ArrayList<Room> result = roomService.getAllMyRooms(username);
        System.out.println("room controoler test" + username);
        for (Room r : result
        ) {
            System.out.println(r.getId());
        }
        System.out.println("so phong " + roomService.getAllMyRooms(username).size());
        return result;

    }


    @PostMapping("/room/member")
    public void addMemberGroup(@RequestHeader("Authorization") String bearerToken, @RequestBody GroupChatDto groupChatDto) {
        Room room = roomService.findById(groupChatDto.getId());
        room.setUpdateAt(LocalDateTime.now());

        String[] mems = groupChatDto.getMembers();
        if (mems.length == 0) return;
        for (String email : mems
        ) {
            User user = userService.findByEmail(email).get();
            user.addRoom(room);
            room.addMember(user);
        }

        roomService.createNewRoom(room);
    }

    @PostMapping("/room")
    public void createGroupChat(@RequestHeader("Authorization") String bearerToken, @RequestBody GroupChatDto groupChatDto) {
        Room room = new Room();
        room.setName(groupChatDto.getName());
        room.setGroup(true);
        room.setCreateAt(LocalDateTime.now());
        room.setUpdateAt(LocalDateTime.now());

        String username = jwtService.extractUsername(bearerToken.substring(7));
        User creator = userService.findByEmail(username).get();
        room.setAdmin(creator);
        creator.addRoom(room);
        room.addMember(creator);

        String[] mems = groupChatDto.getMembers();

        for (String email : mems
        ) {
            User user = userService.findByEmail(email).get();
            user.addRoom(room);
            room.addMember(user);
        }

        roomService.createNewRoom(room);

    }

    @GetMapping("/rooms/{id}/members")
    public List<Room> getMembersInRoom(@PathVariable long id) {

        return (List) roomService.getMembersInRoom(id);

    }
}
