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
//    private Set<CourseDto> courses;
    private String description;

//    private Set<ScheduleDto> schedules;
// Optional: instead of full objects, use just schedule IDs
    @JsonIgnore
private Set<Long> scheduleIds;


    // Add votes as a Set of VoteDto
    private Set<VoteDto> votes;

    // Method to convert DTO to Entity
    public Professor toEntity(ModelMapper mapper) {
        Professor professor = mapper.map(this, Professor.class);

        // Optionally, if you want to map votes back to entities:
        if (this.votes != null) {
            // Assuming VoteDto has an ID field, and you're mapping these to Vote entities.
            Set<Vote> voteEntities = this.votes.stream()
                    .map(voteDto -> mapper.map(voteDto, Vote.class))  // This requires a Vote mapping
                    .collect(Collectors.toSet());
            professor.setVotes(voteEntities);
        }
//        if (this.courses != null) {
//            Set<Course> courseEntities = this.courses.stream()
//                    .map( courseDto -> mapper.map(courseDto, Course.class))
//                    .collect(Collectors.toSet());
//            professor.setCourses(courseEntities);
//        }



        return professor;
    }
}
