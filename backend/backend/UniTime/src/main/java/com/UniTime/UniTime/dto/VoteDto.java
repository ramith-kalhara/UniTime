package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Vote;
import jakarta.persistence.Column;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.List;

@Data
public class VoteDto {

    private Long id;
    private String start_date;
    private String end_date;
    private String start_time;
    private String end_time;
    private String description;

    private List<ProfessorDto> professors;

    private CourseDto course;



    public Vote toEntity(ModelMapper mapper) {
        // Convert VoteDto to Vote entity, also converting CourseDto to Course entity
        Vote vote = mapper.map(this, Vote.class);
        if (this.course != null) {
            vote.setCourse(this.course.toEntity(mapper)); // Set the Course entity on Vote
        }
        return vote;
    }
}
