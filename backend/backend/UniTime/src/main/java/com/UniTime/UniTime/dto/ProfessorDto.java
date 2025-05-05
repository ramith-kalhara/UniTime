package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Professor;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProfessorDto {
    private Long id;
    private String full_name;
    private String email;
    private int tp_num;
    private String department_name;
    private String address;
    private String city;
    private String country;
    private String postal_code;
    private String description;

    // Add reference to the CourseDto
    private CourseDto course;

    private VoteDto vote;

    private List<UserVoteDto> userVote;


    public Professor toEntity(ModelMapper mapper) {

        Professor professor = mapper.map(this, Professor.class);
        professor.setUserVote(new ArrayList<>()); // prevent automatic mapping of user votes

        return professor;
    }
}
