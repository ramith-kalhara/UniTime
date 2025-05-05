package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.RoomRepository;
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
    private final RoomRepository roomRepository;
    private final ProfessorRepository professorRepository;

    private final ModelMapper mapper;

    // Create schedule
    @Override
    public ScheduleDto postSchedule(ScheduleDto scheduleDto) {
        // Convert DTO to Entity
        Schedule schedule = mapper.map(scheduleDto, Schedule.class);

        // Check if the room is provided in the DTO and set it
        if (scheduleDto.getRoom() != null && scheduleDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(scheduleDto.getRoom().getId())
                    .orElseThrow(() -> new NotFoundException("Room not found with id: " + scheduleDto.getRoom().getId()));
            schedule.setRoom(room); // Set the room in the schedule
        }

        //  Set Professor
        if (scheduleDto.getProfessor() != null && scheduleDto.getProfessor().getId() != null) {
            Professor professor = professorRepository.findById(scheduleDto.getProfessor().getId())
                    .orElseThrow(() -> new NotFoundException("Professor not found with id: " + scheduleDto.getProfessor().getId()));
            schedule.setProfessor(professor);
        }

        // Save the schedule entity
        Schedule savedSchedule = scheduleRepository.save(schedule);

        // Return the saved schedule as a DTO (includes room details)
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

        //check room and schedule relation
        if (scheduleDto.getRoom() != null && scheduleDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(scheduleDto.getRoom().getId())
                    .orElseThrow(() -> new NotFoundException("Room not found with id: " + scheduleDto.getRoom().getId()));
            schedule.setRoom(room);
        }


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
