package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.HashSet;
import java.util.Set;

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
    private String moduleId;


    @ManyToMany
    @JoinTable(
            name = "user_course",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_schedule",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "schedule_id")
    )
    @JsonIgnore  // Avoid circular reference in serialization
    private Set<Schedule> schedules = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_vote",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "vote_id")
    )
    @JsonIgnore // Prevent circular reference during JSON serialization
    private Set<Vote> votes = new HashSet<>();





    public UserDto toDto(ModelMapper mapper) {
        UserDto userDto = mapper.map(this, UserDto.class);
        // Avoid mapping circular reference for schedules
        userDto.setSchedules(new HashSet<>());
        return userDto;
    }

}
