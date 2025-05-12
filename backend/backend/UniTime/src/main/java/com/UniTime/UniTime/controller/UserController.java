package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.LoginRequestDto;
import com.UniTime.UniTime.dto.LoginResponseDto;
import com.UniTime.UniTime.dto.UserDto;
import com.UniTime.UniTime.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserServiceImpl userService;

    // Create User
    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<UserDto> postUser(
            @RequestPart("user") UserDto userDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            // Call the service to handle the user creation
            UserDto savedUser = userService.postUser(userDto, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (IOException e) {
            // Handle error in case of issues with image upload or other IO problems
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Get all users
    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    // Get user by id
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
    }

    // Update user by id
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(id, userDto));
    }

    // Delete user by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(id));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginDto) {
        LoginResponseDto response = userService.authenticateUser(loginDto);
        return ResponseEntity.ok(response);
    }

}
