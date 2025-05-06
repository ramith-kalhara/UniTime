package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.entity.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String tpNum;
    private String password;
    private String email;

    private List<UserVoteDto> userVotes;

    private List<CourseDto> courses;

    private List<ScheduleDto> schedules = new ArrayList<>();


    // Convert UserDto to User entity
    public User toEntity(ModelMapper mapper) {
        return mapper.map(this, User.class);
    }
}
