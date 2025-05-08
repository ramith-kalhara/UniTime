package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.AIScheduleDto;
import com.UniTime.UniTime.dto.AIScheduleRequest;
import com.UniTime.UniTime.entity.AISchedule;

import java.util.List;

public interface AIScheduleService {

    AISchedule generateAndSaveAISchedule (AIScheduleRequest request);

    public List<AIScheduleDto> getAllAISchedules();

    public AIScheduleDto getAIScheduleById(long id);

    public Boolean deleteAIScheduleById(long id);


}
