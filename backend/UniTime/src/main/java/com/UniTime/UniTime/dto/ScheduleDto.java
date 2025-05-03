package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.*;
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
    public Schedule toEntity(ModelMapper mapper) {
        Schedule schedule = new Schedule();

        schedule.setScheduleId(this.scheduleId);
        schedule.setLectureTitle(this.lectureTitle);
        schedule.setStartDate(this.startDate);
        schedule.setStartTime(this.startTime);
        schedule.setEndTime(this.endTime);
        schedule.setScheduleDescription(this.scheduleDescription);

        if (this.professor != null) {
            schedule.setProfessor(mapper.map(this.professor, Professor.class));
        }

        if (this.room != null) {
            schedule.setRoom(mapper.map(this.room, Room.class));
        }

        if (this.course != null) {
            schedule.setCourse(mapper.map(this.course, Course.class));
        }

        if (this.users != null) {
            Set<User> userEntities = this.users.stream()
                    .map(userDto -> {
                        User user = userDto.toEntity(mapper);
                        user.getSchedules().add(schedule);  // Fix bidirectional reference
                        return user;
                    })
                    .collect(Collectors.toSet());

            schedule.setUsers(userEntities);
        }

        return schedule;
    }






}
