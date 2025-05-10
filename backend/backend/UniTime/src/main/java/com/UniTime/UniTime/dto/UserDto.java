package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.entity.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.Base64;
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
    private String imageBase64;


    // Convert UserDto to User entity
    public User toEntity(ModelMapper mapper) {
        User user = mapper.map(this, User.class);
        if (this.imageBase64 != null) {
            user.setImageData(Base64.getDecoder().decode(this.imageBase64));
        }
        return mapper.map(this, User.class);
    }
}
