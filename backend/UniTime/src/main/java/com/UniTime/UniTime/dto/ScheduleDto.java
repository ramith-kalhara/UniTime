package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class ScheduleDto {

    private Long scheduleId;
    private ProfessorDto professor;
    private RoomDto room;
    private CourseDto course;
    private String lectureTitle;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String scheduleDescription;
    private Set<UserDto> users;

}
