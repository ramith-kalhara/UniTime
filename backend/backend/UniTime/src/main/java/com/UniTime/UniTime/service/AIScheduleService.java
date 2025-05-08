package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.AIScheduleRequest;
import com.UniTime.UniTime.entity.AISchedule;

public interface AIScheduleService {

    AISchedule generateAndSaveAISchedule (AIScheduleRequest request);
}
