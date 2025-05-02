package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
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
    private final ModelMapper mapper;
    private final ProfessorRepository professorRepository;
    private final RoomRepository roomRepository;
    private final CourseRepository courseRepository;


    @Override
    public ScheduleDto postSchedule(ScheduleDto scheduleDto) {
        Schedule schedule = mapper.map(scheduleDto, Schedule.class);

        if (scheduleDto.getProfessor() != null && scheduleDto.getProfessor().getId() != null) {
            Professor professor = professorRepository.findById(scheduleDto.getProfessor().getId())
                    .orElseThrow(() -> new NotFoundException("Professor not found"));
            schedule.setProfessor(professor);
        }

        if (scheduleDto.getRoom() != null && scheduleDto.getRoom().getId() != null) { // ✅ Room handling
            Room room = roomRepository.findById(scheduleDto.getRoom().getId())
                    .orElseThrow(() -> new NotFoundException("Room not found"));
            schedule.setRoom(room);
        }

        if (scheduleDto.getCourse() != null && scheduleDto.getCourse().getCourseId() != null) {
            Course course = courseRepository.findById(scheduleDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found"));
            schedule.setCourse(course);
        }


        Schedule savedSchedule = scheduleRepository.save(schedule);
        return savedSchedule.toDto(mapper); // Ensure proper nested mapping


    }

    @Override
    public List<ScheduleDto> getAllSchedules() {
        List<Schedule> schedules = scheduleRepository.findAll();
        if (schedules.isEmpty()) {
            return new ArrayList<>();
        } else {
            return schedules.stream().map(schedule -> schedule.toDto(mapper)).toList();
        }
    }

    @Override
    public ScheduleDto getScheduleById(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Schedule not found by this ID"));
        return schedule.toDto(mapper);
    }

    @Override
    public ScheduleDto updateSchedule(Long id, ScheduleDto scheduleDto) {
        Schedule schedule = mapper.map(scheduleDto, Schedule.class);
        schedule.setScheduleId(id);

        if (scheduleDto.getProfessor() != null && scheduleDto.getProfessor().getId() != null) {
            Professor professor = professorRepository.findById(scheduleDto.getProfessor().getId())
                    .orElseThrow(() -> new NotFoundException("Professor not found"));
            schedule.setProfessor(professor);
        }

        if (scheduleDto.getRoom() != null && scheduleDto.getRoom().getId() != null) { // ✅ Room handling
            Room room = roomRepository.findById(scheduleDto.getRoom().getId())
                    .orElseThrow(() -> new NotFoundException("Room not found"));
            schedule.setRoom(room);
        }

        if (scheduleDto.getCourse() != null && scheduleDto.getCourse().getCourseId() != null) {
            Course course = courseRepository.findById(scheduleDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found"));
            schedule.setCourse(course);
        }


        Schedule savedSchedule = scheduleRepository.save(schedule);
        return mapper.map(savedSchedule, ScheduleDto.class);
    }

    @Override
    public Boolean deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
        return true;
    }
}
