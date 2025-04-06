package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String tpNum;
    private String password;
    private String bookRoomId;
    private String courseId;
    private String email;
    private String moduleId;

    // Convert UserDto to User entity
    public User toEntity(ModelMapper mapper) {
        return mapper.map(this, User.class);
    }
}
