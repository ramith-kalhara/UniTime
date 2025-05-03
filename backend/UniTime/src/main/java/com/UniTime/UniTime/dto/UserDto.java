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

    private Set<CourseDto> courses = new HashSet<>();  // Mapping courses as CourseDto
    private Set<ScheduleDto> schedules = new HashSet<>();
    private Set<Long> voteIds = new HashSet<>();  // Track voteIds instead of Vote entities

    // Method to convert UserDto to User entity
    public User toEntity(ModelMapper mapper) {
        User user = mapper.map(this, User.class);
        // Ensure the courses, schedules, and votes are not null or empty
        user.setCourses(new HashSet<>());
        user.setSchedules(new HashSet<>());
        user.setVotes(new HashSet<>());
        return user;
    }

}
