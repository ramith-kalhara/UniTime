package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id", updatable = false, nullable = false)
    private Long courseId;

    @Column(name = "course_code", nullable = false, length = 50)
    private String courseCode;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "credits", nullable = false)
    private int credits;

    @Column(name = "department", nullable = false, length = 100)
    private String department;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Professor> professors;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Schedule> schedules = new ArrayList<>();

    @OneToOne(mappedBy = "course")
    private Vote vote;

    @ManyToMany(mappedBy = "courses")
    private List<User> users = new ArrayList<>();


    public CourseDto toDto(ModelMapper mapper) {
        // 1. Map simple fields
        CourseDto dto = mapper.map(this, CourseDto.class);

        //  Map schedules
        if (this.getSchedules() != null) {
            List<ScheduleDto> scheduleDtos = this.getSchedules().stream()
                    .map(s -> mapper.map(s, ScheduleDto.class))
                    .collect(Collectors.toList());
            dto.setSchedules(scheduleDtos);
        }

        //  Map enrolled users (the many-to-many side)
        if (this.getUsers() != null) {
            List<UserDto> userDtos = this.getUsers().stream()
                    .map(u -> mapper.map(u, UserDto.class))
                    .collect(Collectors.toList());
            dto.setUsers(userDtos);
        }



        return dto;
    }


}
