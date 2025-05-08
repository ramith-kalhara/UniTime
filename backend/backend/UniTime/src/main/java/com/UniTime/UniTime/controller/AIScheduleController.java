package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.AIScheduleRequest;
import com.UniTime.UniTime.entity.AISchedule;
import com.UniTime.UniTime.service.AIScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai-schedule")
public class AIScheduleController {
    @Autowired
    private AIScheduleService aiScheduleService;

    @PostMapping("/generate")
    public ResponseEntity<AISchedule> generateAISchedule(@RequestBody AIScheduleRequest request) {
        AISchedule schedule = aiScheduleService.generateAndSaveAISchedule(request);
        return new ResponseEntity<>(schedule, HttpStatus.CREATED);
    }
}
