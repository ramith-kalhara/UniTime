package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.HashSet;
import java.util.Set;

@Data
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String tpNum;
    private String password;
    private String email;
    private String moduleId;

    private Set<CourseDto> courses = new HashSet<>();
    private Set<ScheduleDto> schedules = new HashSet<>();
    private Set<Long> voteIds = new HashSet<>();  // Updated to track voteIds instead of Vote entities

    public User toEntity(ModelMapper mapper) {
        User user = mapper.map(this, User.class);
        user.setSchedules(null); // avoid circular reference
        return user;
    }
}
