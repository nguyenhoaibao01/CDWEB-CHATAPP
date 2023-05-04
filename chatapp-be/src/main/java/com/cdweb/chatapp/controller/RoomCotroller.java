package com.cdweb.chatapp.controller;

import com.cdweb.chatapp.model.Room;
import com.cdweb.chatapp.service.JwtService;
import com.cdweb.chatapp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/chatapp.api")
public class RoomCotroller {

    @Autowired
    private RoomService roomService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/rooms")
    public List<Room> getAllMyRooms(@RequestHeader("Authorization") String bearerToken) {
        String username = jwtService.extractUsername(bearerToken.substring(7));
        ArrayList<Room> result = roomService.getAllMyRooms(username);
        System.out.println("room controoler test"+username);
        for (Room r: result
             ) {
            System.out.println(r.getId());
        }
        System.out.println("so phong "+roomService.getAllMyRooms(username).size());
        return result;
//    return null;
    }
}
