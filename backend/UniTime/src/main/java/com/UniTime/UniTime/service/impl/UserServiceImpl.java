package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.UserDto;
import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.UserRepository;
import com.UniTime.UniTime.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper mapper;
    private final CourseRepository courseRepository;


    //create user
    @Override
    public UserDto postUser(UserDto userDto) {
        // Convert DTO to Entity
        User user = mapper.map(userDto, User.class);

        // Save Entity
        User savedUser = userRepository.save(user);

        // Convert back to DTO and return
        return mapper.map(savedUser, UserDto.class);
    }

    //get all users
    @Override
    public List<UserDto> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        if (allUsers.isEmpty()) {
            return new ArrayList<>();
        } else {
            return allUsers.stream().map(user -> mapper.map(user, UserDto.class)).toList();
        }
    }

    //get user by id
    @Override
    public UserDto getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return mapper.map(user.get(), UserDto.class);
        } else {
            throw new NotFoundException("User not found by this ID");
        }
    }

    //update user by id
    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = mapper.map(userDto, User.class);
        user.setId(id);
        User savedUser = userRepository.save(user);
        return mapper.map(savedUser, UserDto.class);
    }

    //delete user
    @Override
    public Boolean deleteUser(Long id) {
        userRepository.deleteById(id);
        return true;
    }



}
