package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Vote;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.Set;
import java.util.stream.Collectors;
@Data
public class ProfessorDto {
    private Long id;
    private String full_name;
    private String email;
    private String tp_num;
    private String department_name;
    private String address;
    private String city;
    private String country;
    private String postal_code;
    private String description;

    // One course (Many Professors -> One Course)
    private CourseDto course;

    // Optional: if you use it
    private Set<VoteDto> votes;

    // Convert DTO to Entity
    public Professor toEntity(ModelMapper mapper) {
        Professor professor = mapper.map(this, Professor.class);

        // Map course (Many-to-One)
        if (this.course != null) {
            Course courseEntity = mapper.map(this.course, Course.class);
            professor.setCourse(courseEntity);
        }

        // Optional: Map votes
        if (this.votes != null) {
            Set<Vote> voteEntities = this.votes.stream()
                    .map(voteDto -> mapper.map(voteDto, Vote.class))
                    .collect(Collectors.toSet());
            professor.setVotes(voteEntities);
        }

        return professor;
    }
}
