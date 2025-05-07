package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Course; // Ensure this import is present
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.util.List;

@Data
public class CourseDto {
    private Long courseId;
    private String courseCode;
    private String name;
    private int credits;
    private String department;
    private LocalDate startDate;
    private String description;

    // Create ref
    private List<ProfessorDto> professors;

    private List<ScheduleDto> schedules;

    private VoteDto vote;

    private List<UserDto> users;


    // Method to convert CourseDto to Course entity
    public Course toEntity(ModelMapper mapper) {

        Course course = mapper.map(this, Course.class);
        if (this.vote != null) {
            course.setVote(this.vote.toEntity(mapper));
        }
        return course;
    }
}

