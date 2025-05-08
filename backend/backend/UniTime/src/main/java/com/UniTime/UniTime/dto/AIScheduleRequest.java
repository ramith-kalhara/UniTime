package com.UniTime.UniTime.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class AIScheduleRequest {
    private Long courseId;
    private Long moduleId;
    private Long professorId;
    private Long roomId;
}
