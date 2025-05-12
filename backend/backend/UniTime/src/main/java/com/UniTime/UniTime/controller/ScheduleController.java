package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.service.impl.ScheduleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/schedule")
@RequiredArgsConstructor
@CrossOrigin
public class ScheduleController {

    private final ScheduleServiceImpl scheduleService;

    // Create schedule
    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<ScheduleDto> postSchedule(
            @RequestPart("schedule") ScheduleDto scheduleDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            ScheduleDto savedSchedule = scheduleService.postSchedule(scheduleDto, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSchedule);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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

    @GetMapping("/reportAllSchedules")
    public ResponseEntity<byte[]> getScheduleReport() {
        byte[] pdf = scheduleService.generateSchedulePdfReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename("schedule_report.pdf")
                .build());

        return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
    }

}