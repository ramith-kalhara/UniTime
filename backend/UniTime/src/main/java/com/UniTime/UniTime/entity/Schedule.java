package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.ScheduleDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = false)
    @JsonBackReference
    private Professor professor;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;


    private String lectureTitle;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalTime endTime;

    @Column(columnDefinition = "TEXT")
    private String scheduleDescription;

    @ManyToMany(mappedBy = "schedules")
    private Set<User> users = new HashSet<>();

    public ScheduleDto toDto(ModelMapper mapper) {
        ScheduleDto dto = mapper.map(this, ScheduleDto.class);
        if (this.course != null) {
            dto.setCourse(mapper.map(this.course, CourseDto.class));
        }
        return dto;
    }


}
