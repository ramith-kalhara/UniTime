package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.AISchedule;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.List;

@Data
public class AIScheduleDto {
    private Long courseId ;
    private Long professorId;
    private Long roomId;
    private String timeSlot;
    private Integer capacity;

    private List<UserDto> users;

    public AISchedule toEntity(ModelMapper mapper) {
        AISchedule aiSchedule = mapper.map(this, AISchedule.class);
        return aiSchedule;
    }

}
