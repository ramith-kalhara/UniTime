package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Course; // Ensure this import is present
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Vote;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class CourseDto {
    private Long courseId;
    private String courseCode;
    private String name;
    private int credits;
    private String department;
    private LocalDate startDate;
    private String description;

    private Set<ProfessorDto> professors;
    private Set<UserDto> users = new HashSet<>();  // Add this to track users associated with the course

    private VoteDto vote;  // Add this field to handle VoteDto

    // Method to convert CourseDto to Course entity
    public Course toEntity(ModelMapper mapper) {
        Course course = mapper.map(this, Course.class);

        // Optionally, map professors if present
        if (this.professors != null) {
            Set<Professor> professorEntities = this.professors.stream()
                    .map(professorDto -> mapper.map(professorDto, Professor.class))
                    .collect(Collectors.toSet());
            course.setProfessors(professorEntities);
        }

        // Handle Vote mapping if present
        if (this.vote != null) {
            // Optionally, map VoteDto to Vote entity if you're passing the vote DTO to the backend
            Vote voteEntity = mapper.map(this.vote, Vote.class);
            course.setVote(voteEntity);
        }

        return course;
    }
}
