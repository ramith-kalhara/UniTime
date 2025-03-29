package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.service.impl.ScheduleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/schedule")
@RequiredArgsConstructor
@CrossOrigin
public class ScheduleController {

    private final ScheduleServiceImpl scheduleService;

    // Create schedule
    @PostMapping("/create")
    public ResponseEntity<ScheduleDto> postSchedule(@RequestBody ScheduleDto scheduleDto){
        return ResponseEntity.status(HttpStatus.OK).body(scheduleService.postSchedule(scheduleDto));
    }

    // Get all schedules
    @GetMapping("/")
    public ResponseEntity<List<ScheduleDto>> getAllSchedules(){
        return ResponseEntity.status(HttpStatus.OK).body(scheduleService.getAllSchedules());
    }

    // Get schedule by id
    @GetMapping("/{id}")
    public ResponseEntity<ScheduleDto> getScheduleById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(scheduleService.getScheduleById(id));
    }

    // Update schedule by id
    @PutMapping("/{id}")
    public ResponseEntity<ScheduleDto> updateSchedule(@PathVariable Long id, @RequestBody ScheduleDto scheduleDto){
        return ResponseEntity.status(HttpStatus.OK).body(scheduleService.updateSchedule(id, scheduleDto));
    }

    // Delete schedule by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteSchedule(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(scheduleService.deleteSchedule(id));
    }
}