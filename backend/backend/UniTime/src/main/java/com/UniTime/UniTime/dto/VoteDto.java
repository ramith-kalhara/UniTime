package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Vote;
import jakarta.persistence.Column;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class VoteDto {

    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String description;

    private List<ProfessorDto> professors;

    private CourseDto course;

    private List<UserVoteDto> userVotes;



    public Vote toEntity(ModelMapper mapper) {
        return mapper.map(this, Vote.class);
    }
}
