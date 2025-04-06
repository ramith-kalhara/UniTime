package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Schedule;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.Set;

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

    private Set<Schedule> schedules;

    public User toEntity(ModelMapper mapper) {
        return mapper.map(this, User.class);
    }
}
