package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.CourseDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Professor> professors = new HashSet<>();

    @OneToMany(mappedBy = "course")
    private Set<Schedule> schedules;

    @OneToOne(mappedBy = "course")
    private Vote vote;

    // Many-to-Many Relationship with User (mappedBy = "courses")
    @ManyToMany(mappedBy = "courses")
    private Set<User> users = new HashSet<>();




    // Convert the Course entity to CourseDto
    public CourseDto toDto(ModelMapper mapper) {
        return mapper.map(this, CourseDto.class);
    }
}
