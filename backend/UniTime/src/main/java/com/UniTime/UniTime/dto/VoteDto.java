package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Vote;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class VoteDto {
    private Long id;
    private String start_date;
    private String end_date;
    private String start_time;
    private String end_time;
    private String description;
    private Long courseId;
    private List<Long> professorIds;
    private Set<Long> userIds;

    // Method to convert VoteDto to Vote entity
    public Vote toEntity(ModelMapper mapper,
                         Set<Professor> professors,
                         Set<User> users,
                         Course course) {
        Vote vote = mapper.map(this, Vote.class);
        vote.setProfessors(professors);
        vote.setUsers(users);
        vote.setCourse(course);
        return vote;
    }
}
