package com.UniTime.UniTime.controller;
import com.UniTime.UniTime.dto.RoomDto;
import com.UniTime.UniTime.service.impl.RoomServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
@RestController
@RequestMapping("api/room")
@RequiredArgsConstructor
@CrossOrigin
public class RoomController {

    private final RoomServiceImpl roomService;

    // create Room with image upload
    @PostMapping("/create")
    public ResponseEntity<RoomDto> postRoom(
            @RequestPart("roomDto") String roomDtoJson,  // use @RequestPart to handle JSON data
            @RequestPart("image") MultipartFile imageFile) { // handle the image upload part

        // Convert roomDtoJson to RoomDto
        ObjectMapper objectMapper = new ObjectMapper();
        RoomDto roomDto;
        try {
            roomDto = objectMapper.readValue(roomDtoJson, RoomDto.class);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // Save image and get image path
        String imagePath = saveImage(imageFile); // Implement this method

        // Set image path to RoomDto
        roomDto.setImagePath(imagePath);

        // Save room
        RoomDto savedRoom = roomService.postRoom(roomDto);

        return ResponseEntity.status(HttpStatus.OK).body(savedRoom);
    }

    // Helper method to save image and return the image path
    private String saveImage(MultipartFile imageFile) {
        String uploadDir = "uploads/";  // Define the directory for image storage

        String fileName = imageFile.getOriginalFilename();
        String filePath = uploadDir + fileName;

        try {
            // Save the image to the file system
            Path path = Paths.get(filePath);
            Files.write(path, imageFile.getBytes());

            return filePath;  // Return the image path
        } catch (IOException e) {
            e.printStackTrace();
            return null;  // Return null if there was an error
        }
    }

    // Other existing methods remain the same
    @GetMapping("/")
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        return ResponseEntity.status(HttpStatus.OK).body(roomService.getAllRooms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(roomService.getRoomById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomDto> updateRoom(@PathVariable Long id, @RequestBody RoomDto roomDto) {
        return ResponseEntity.status(HttpStatus.OK).body(roomService.updateRoom(id, roomDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteRoom(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(roomService.deleteRoom(id));
    }
}
