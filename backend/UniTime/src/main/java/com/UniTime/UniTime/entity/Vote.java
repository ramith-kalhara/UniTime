package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.VoteDto;
import jakarta.persistence.*;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String start_date;
    private String end_date;
    private String start_time;
    private String end_time;
    private String description;


    // Mapping to professors
    @ManyToMany(cascade = { CascadeType.MERGE })
    @JoinTable(
            name = "vote_professor",
            joinColumns = @JoinColumn(name = "vote_id"),
            inverseJoinColumns = @JoinColumn(name = "professor_id")
    )
    private Set<Professor> professors = new HashSet<>();


    // Mapping to user
    @ManyToMany(mappedBy = "votes")
    private Set<User> users = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "course_id", referencedColumnName = "course_id")
    private Course course;



    // You can also add other fields and methods if necessary
    public VoteDto toDto(ModelMapper mapper) {
        VoteDto dto = mapper.map(this, VoteDto.class);

        // Manually map courseId if course is present
        if (this.course != null) {
            dto.setCourseId(this.course.getCourseId());
        }

        // Map professor IDs
        if (this.professors != null) {
            dto.setProfessorIds(this.professors.stream()
                    .map(Professor::getId)
                    .toList());
        }

        // Map user IDs
        if (this.users != null) {
            dto.setUserIds(this.users.stream()
                    .map(User::getId)
                    .collect(java.util.stream.Collectors.toSet()));
        }

        return dto;
    }
}
