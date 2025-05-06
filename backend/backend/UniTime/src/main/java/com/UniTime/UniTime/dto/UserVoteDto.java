package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.UserVote;
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
public class UserVoteDto {

    private Long id;

    private ProfessorDto professor;

    private VoteDto vote;

    private UserDto user;


    public UserVote toEntity(ModelMapper mapper) {
        UserVote userVote = mapper.map(this, UserVote.class);
        return userVote;
    }

}
