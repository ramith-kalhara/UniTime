package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.entity.*;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.*;
import com.UniTime.UniTime.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ModelMapper mapper;
    private final ProfessorRepository professorRepository;
    private final RoomRepository roomRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Override
    public ScheduleDto postSchedule(ScheduleDto scheduleDto) {
        Schedule schedule = new Schedule();

        schedule.setLectureTitle(scheduleDto.getLectureTitle());
        schedule.setStartDate(scheduleDto.getStartDate());
        schedule.setStartTime(scheduleDto.getStartTime());
        schedule.setEndTime(scheduleDto.getEndTime());
        schedule.setScheduleDescription(scheduleDto.getScheduleDescription());

        if (scheduleDto.getProfessor() != null && scheduleDto.getProfessor().getId() != null) {
            Professor professor = professorRepository.findById(scheduleDto.getProfessor().getId())
                    .orElseThrow(() -> new NotFoundException("Professor not found"));
            schedule.setProfessor(professor);
        }

        if (scheduleDto.getRoom() != null && scheduleDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(scheduleDto.getRoom().getId())
                    .orElseThrow(() -> new NotFoundException("Room not found"));
            schedule.setRoom(room);
        }

        if (scheduleDto.getCourse() != null && scheduleDto.getCourse().getCourseId() != null) {
            Course course = courseRepository.findById(scheduleDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found"));
            schedule.setCourse(course);
        }

        if (scheduleDto.getUsers() != null && !scheduleDto.getUsers().isEmpty()) {
            Set<User> users = scheduleDto.getUsers().stream()
                    .map(userDto -> userRepository.findById(userDto.getId())
                            .orElseThrow(() -> new NotFoundException("User not found with ID: " + userDto.getId())))
                    .collect(Collectors.toSet());
            schedule.setUsers(users);
        }

        Schedule savedSchedule = scheduleRepository.save(schedule);
        return savedSchedule.toDto(mapper);
    }

    @Override
    public List<ScheduleDto> getAllSchedules() {
        return scheduleRepository.findAll().stream()
                .map(schedule -> schedule.toDto(mapper))
                .collect(Collectors.toList());
    }

    @Override
    public ScheduleDto getScheduleById(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Schedule not found with ID: " + id));
        return schedule.toDto(mapper);
    }

    @Override
    public ScheduleDto updateSchedule(Long id, ScheduleDto scheduleDto) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Schedule not found with ID: " + id));

        schedule.setLectureTitle(scheduleDto.getLectureTitle());
        schedule.setStartDate(scheduleDto.getStartDate());
        schedule.setStartTime(scheduleDto.getStartTime());
        schedule.setEndTime(scheduleDto.getEndTime());
        schedule.setScheduleDescription(scheduleDto.getScheduleDescription());

        if (scheduleDto.getProfessor() != null && scheduleDto.getProfessor().getId() != null) {
            Professor professor = professorRepository.findById(scheduleDto.getProfessor().getId())
                    .orElseThrow(() -> new NotFoundException("Professor not found"));
            schedule.setProfessor(professor);
        }

        if (scheduleDto.getRoom() != null && scheduleDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(scheduleDto.getRoom().getId())
                    .orElseThrow(() -> new NotFoundException("Room not found"));
            schedule.setRoom(room);
        }

        if (scheduleDto.getCourse() != null && scheduleDto.getCourse().getCourseId() != null) {
            Course course = courseRepository.findById(scheduleDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found"));
            schedule.setCourse(course);
        }

        if (scheduleDto.getUsers() != null && !scheduleDto.getUsers().isEmpty()) {
            Set<User> users = scheduleDto.getUsers().stream()
                    .map(userDto -> userRepository.findById(userDto.getId())
                            .orElseThrow(() -> new NotFoundException("User not found with ID: " + userDto.getId())))
                    .collect(Collectors.toSet());
            schedule.setUsers(users);

            //  Maintain inverse relationship
            for (User user : users) {
                user.getSchedules().add(schedule);
            }
        }


        Schedule updatedSchedule = scheduleRepository.save(schedule);
        return updatedSchedule.toDto(mapper);
    }

    @Override
    public Boolean deleteSchedule(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new NotFoundException("Schedule not found with ID: " + id);
        }
        scheduleRepository.deleteById(id);
        return true;
    }
}
