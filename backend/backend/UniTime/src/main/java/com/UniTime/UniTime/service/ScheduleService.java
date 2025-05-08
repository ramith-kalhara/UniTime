package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.ScheduleDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ScheduleService {
    public ScheduleDto postSchedule(ScheduleDto scheduleDto, MultipartFile image) throws IOException;
    public List<ScheduleDto> getAllSchedules();
    public ScheduleDto getScheduleById(Long id);
    public ScheduleDto updateSchedule(Long id, ScheduleDto scheduleDto);
    public Boolean deleteSchedule(Long id);
}
