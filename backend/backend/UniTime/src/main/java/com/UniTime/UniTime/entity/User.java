package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.UserDto;
import com.UniTime.UniTime.dto.UserVoteDto;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String tpNum;
    private String password;
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserVote> userVotes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_courses",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private List<Course> courses = new ArrayList<>();




    public UserDto toDto(ModelMapper mapper) {
        // 1. Map all the simple fields
        UserDto dto = mapper.map(this, UserDto.class);

        //  Map the many-to-many courses → List<CourseDto>
        if (this.getCourses() != null) {
            List<CourseDto> courseDtos = this.getCourses().stream()
                    .map(course -> mapper.map(course, CourseDto.class))
                    .collect(Collectors.toList());
            dto.setCourses(courseDtos);
        }

        //  Map the one-to-many votes → List<UserVoteDto>
        if (this.getUserVotes() != null) {
            List<UserVoteDto> uvDtos = this.getUserVotes().stream()
                    .map(uv -> mapper.map(uv, UserVoteDto.class))
                    .collect(Collectors.toList());
            dto.setUserVotes(uvDtos);
        }

        return dto;
    }

}
