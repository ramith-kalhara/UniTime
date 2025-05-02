package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.entity.User;
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
    private String moduleCode;
    private String lectureTitle;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String scheduleDescription;

    @JsonIgnore
    private Set<User> users;

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

        return schedule;
    }
}
