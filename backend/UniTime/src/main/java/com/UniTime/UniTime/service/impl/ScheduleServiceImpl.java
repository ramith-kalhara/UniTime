package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.ScheduleRepository;
import com.UniTime.UniTime.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final ModelMapper mapper;

    // Create schedule
    @Override
    public ScheduleDto postSchedule(ScheduleDto scheduleDto) {
        Schedule schedule = mapper.map(scheduleDto, Schedule.class);
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return mapper.map(savedSchedule, ScheduleDto.class);
    }

    // Get all schedules
    @Override
    public List<ScheduleDto> getAllSchedules() {
        List<Schedule> schedules = scheduleRepository.findAll();
        if (schedules.isEmpty()) {
            return new ArrayList<>();
        } else {
            return schedules.stream().map(schedule -> schedule.toDto(mapper)).toList();
        }
    }

    // Get schedule by id
    @Override
    public ScheduleDto getScheduleById(Long id) {
        Optional<Schedule> schedule = scheduleRepository.findById(id);
        if (schedule.isPresent()) {
            return schedule.get().toDto(mapper);
        } else {
            throw new NotFoundException("Schedule not found by this ID");
        }
    }

    // Update schedule by id
    @Override
    public ScheduleDto updateSchedule(Long id, ScheduleDto scheduleDto) {
        Schedule schedule = scheduleDto.toEntity(mapper);
        schedule.setScheduleId(id);
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return savedSchedule.toDto(mapper);
    }

    // Delete schedule
    @Override
    public Boolean deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
        return true;
    }
}
