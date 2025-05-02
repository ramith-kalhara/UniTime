package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
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


    private String lectureTitle;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalTime endTime;

    @Column(columnDefinition = "TEXT")
    private String scheduleDescription;

    @ManyToMany(mappedBy = "schedules", fetch = FetchType.LAZY)
    private Set<User> users = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professor_id", nullable = false)
    @JsonBackReference
    private Professor professor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;


    public ScheduleDto toDto(ModelMapper mapper) {
        ScheduleDto dto = mapper.map(this, ScheduleDto.class);

        // Map nested DTOs manually if ModelMapper doesn't handle them well
        if (this.getProfessor() != null) {
            Professor professor = this.getProfessor();
            ProfessorDto professorDto = new ProfessorDto();
            professorDto.setId(professor.getId());
            professorDto.setFull_name(professor.getFull_name());
            dto.setProfessor(professorDto);
        }

        if (this.getRoom() != null) {
            Room room = this.getRoom();
            RoomDto roomDto = new RoomDto();
            roomDto.setId(room.getId());
            roomDto.setRoomType(room.getRoomType());
            dto.setRoom(roomDto);
        }

        if (this.getCourse() != null) {
            Course course = this.getCourse();
            CourseDto courseDto = new CourseDto();
            courseDto.setCourseId(course.getCourseId());
            courseDto.setName(course.getName());
            dto.setCourse(courseDto);
        }

        if (this.getUsers() != null) {
            Set<UserDto> userDtos = this.getUsers().stream().map(user -> {
                UserDto userDto = new UserDto();
                userDto.setId(user.getId());
                userDto.setEmail(user.getEmail());
                return userDto;
            }).collect(Collectors.toSet());

            dto.setUsers(userDtos);
        }

        return dto;
    }

}
