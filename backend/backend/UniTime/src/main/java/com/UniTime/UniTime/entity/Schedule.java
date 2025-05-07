package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalTime;
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
@Table(name = "schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    private String roomNumber;
    private String professorName;
    private int capacity;
    private String moduleCode;
    private String lectureTitle;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalTime endTime;

    @Column(columnDefinition = "TEXT")
    private String scheduleDescription;

    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonBackReference
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id")
    @JsonBackReference
    private Professor professor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    @JsonBackReference
    private Course course;

    @ManyToMany(mappedBy = "schedules",cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<>();



    public ScheduleDto toDto(ModelMapper mapper) {
        ScheduleDto dto = mapper.map(this, ScheduleDto.class);

        // Map the many-to-many users → List<UserDto>
        if (this.getUsers() != null) {
            List<UserDto> userDtos = this.getUsers().stream()
                    .map(u -> mapper.map(u, UserDto.class))
                    .collect(Collectors.toList());
            dto.setUsers(userDtos);
        }

        return mapper.map(this, ScheduleDto.class);
    }
}
