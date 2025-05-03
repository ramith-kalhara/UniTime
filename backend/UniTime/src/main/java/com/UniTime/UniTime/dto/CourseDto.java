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

    // ✅ One Course -> Many Professors
    private Set<ProfessorDto> professors;

    private Set<UserDto> users = new HashSet<>();
    private VoteDto vote;

    public Course toEntity(ModelMapper mapper) {
        Course course = mapper.map(this, Course.class);

        // Map professors (reverse side of OneToMany)
        if (this.professors != null) {
            Set<Professor> professorEntities = this.professors.stream()
                    .map(professorDto -> {
                        Professor professor = mapper.map(professorDto, Professor.class);
                        professor.setCourse(course); //  Set course in each professor
                        return professor;
                    })
                    .collect(Collectors.toSet());
            course.setProfessors(professorEntities);
        }

        // Optional: Map vote
        if (this.vote != null) {
            Vote voteEntity = mapper.map(this.vote, Vote.class);
            course.setVote(voteEntity);
        }

        return course;
    }
}
