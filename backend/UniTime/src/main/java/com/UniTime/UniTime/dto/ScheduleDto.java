package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Schedule;
import lombok.Data;
import org.modelmapper.ModelMapper;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ScheduleDto {
    private Long scheduleId;
    private String roomNumber;
    private String professorName;
    private int capacity;
    private String moduleCode;
    private String lectureTitle;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String scheduleDescription;

    public Schedule toEntity(ModelMapper mapper) {
        Schedule schedule = mapper.map(this, Schedule.class);
        return schedule;
    }
}

