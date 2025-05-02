package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;
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

//    @JsonIgnore
//    private Set<User> users;

    public Schedule toEntity(ModelMapper mapper) {
        Schedule schedule = mapper.map(this, Schedule.class);

        if (this.professor != null) {
            Professor profEntity = this.professor.toEntity(mapper);
            profEntity.setSchedules(null);
            schedule.setProfessor(profEntity);
        }

        if (this.room != null) {
            Room roomEntity = this.room.toEntity(mapper);
            roomEntity.setSchedules(null);
            schedule.setRoom(roomEntity);
        }

        if (this.course != null) {
            Course courseEntity = this.course.toEntity(mapper);
            courseEntity.setSchedules(null); // Avoid infinite loop
            schedule.setCourse(courseEntity);
        }




        return schedule;
    }
}
