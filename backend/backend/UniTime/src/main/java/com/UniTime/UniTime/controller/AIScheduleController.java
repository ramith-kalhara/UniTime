package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.AIScheduleDto;
import com.UniTime.UniTime.dto.AIScheduleRequest;
import com.UniTime.UniTime.entity.AISchedule;
import com.UniTime.UniTime.service.AIScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    // Get all AI schedules
    @GetMapping("/")
    public ResponseEntity<List<AIScheduleDto>> getAllAISchedules() {
        return ResponseEntity.status(HttpStatus.OK).body(aiScheduleService.getAllAISchedules());
    }

    // Get AI schedule by ID
    @GetMapping("/{id}")
    public ResponseEntity<AIScheduleDto> getAIScheduleById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(aiScheduleService.getAIScheduleById(id));
    }

    // Delete AI schedule by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAIScheduleById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(aiScheduleService.deleteAIScheduleById(id));
    }

    // Book AI schedule
    @PostMapping("/book")
    public ResponseEntity<String> bookSchedule(@RequestParam Long scheduleId, @RequestParam Long userId) {
        aiScheduleService.bookAISchedule(scheduleId, userId);
        return ResponseEntity.ok("User booked successfully");
    }

}
