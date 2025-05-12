package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.LoginRequestDto;
import com.UniTime.UniTime.dto.LoginResponseDto;
import com.UniTime.UniTime.dto.UserDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    public UserDto postUser(UserDto userDto , MultipartFile image) throws IOException;
    public List<UserDto> getAllUsers();
    public UserDto getUserById(Long id);
    public UserDto updateUser(Long id, UserDto userDto);
    public Boolean deleteUser(Long id);
    LoginResponseDto authenticateUser(LoginRequestDto loginRequestDto);

}
