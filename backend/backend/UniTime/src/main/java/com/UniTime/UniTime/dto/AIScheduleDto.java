package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.AISchedule;
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
public class AIScheduleDto {
    private Long courseId ;
    private Long professorId;
    private Long roomId;
    private String timeSlot;

    public AISchedule toEntity(ModelMapper mapper) {
        AISchedule aiSchedule = mapper.map(this, AISchedule.class);
        return aiSchedule;
    }

}
