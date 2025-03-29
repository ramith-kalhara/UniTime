package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.UserDto;

import java.util.List;

public interface UserService {
    public UserDto postUser(UserDto userDto);
    public List<UserDto> getAllUsers();
    public UserDto getUserById(Long id);
    public UserDto updateUser(Long id, UserDto userDto);
    public Boolean deleteUser(Long id);
}
