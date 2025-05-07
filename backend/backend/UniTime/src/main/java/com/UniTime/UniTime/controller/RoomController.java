package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.RoomDto;
import com.UniTime.UniTime.service.impl.RoomServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/room")
@RequiredArgsConstructor
@CrossOrigin
public class RoomController {

    private final RoomServiceImpl roomService;

    // Create room
    @PostMapping("/create")
    public ResponseEntity<RoomDto> postRoom(@RequestBody RoomDto roomDto) {
        return ResponseEntity.status(HttpStatus.OK).body(roomService.postRoom(roomDto));
    }

    // Get all rooms
    @GetMapping("/")
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        return ResponseEntity.status(HttpStatus.OK).body(roomService.getAllRooms());
    }

    // Get room by ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(roomService.getRoomById(id));
    }

    // Update room
    @PutMapping("/{id}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Long id, @RequestBody RoomDto roomDto) {
        return ResponseEntity.status(HttpStatus.OK).body(roomService.updateRoom(id, roomDto));
    }

    // Delete room
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteRoom(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(roomService.deleteRoom(id));
    }
}
