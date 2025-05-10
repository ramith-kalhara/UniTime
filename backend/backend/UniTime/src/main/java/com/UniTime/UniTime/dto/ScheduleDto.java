package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.entity.User;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Set;

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
    private String imageBase64;
    // Add reference
    private RoomDto room;

    private ProfessorDto professor;

    private CourseDto course;

    private List<UserDto> users = new ArrayList<>();

    public Schedule toEntity(ModelMapper mapper) {

//        this.scheduleId = null;
        Schedule schedule = mapper.map(this, Schedule.class);

        if (this.imageBase64 != null) {
            schedule.setImageData(Base64.getDecoder().decode(this.imageBase64));
        }
        return mapper.map(this, Schedule.class);
    }
}
