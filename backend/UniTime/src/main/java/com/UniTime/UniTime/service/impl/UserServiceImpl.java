package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.UserDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ScheduleRepository;
import com.UniTime.UniTime.repository.UserRepository;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper mapper;
    private final CourseRepository courseRepository;
    private final ScheduleRepository scheduleRepository;
    private final VoteRepository voteRepository;

    // CREATE USER
    @Override
    public UserDto postUser(UserDto userDto) {
        User user = mapper.map(userDto, User.class);

        // Assign courses
        if (userDto.getCourses() != null) {
            Set<Course> courses = userDto.getCourses().stream()
                    .map(dto -> courseRepository.findById(dto.getCourseId())
                            .orElseThrow(() -> new NotFoundException("Course not found: ID " + dto.getCourseId())))
                    .collect(Collectors.toSet());
            user.setCourses(courses);
        }

        // Assign schedules
        if (userDto.getSchedules() != null && !userDto.getSchedules().isEmpty()) {
            Set<Schedule> schedules = userDto.getSchedules().stream()
                    .map(dto -> scheduleRepository.findById(dto.getScheduleId())
                            .orElseThrow(() -> new NotFoundException("Schedule not found: ID " + dto.getScheduleId())))
                    .collect(Collectors.toSet());
            user.setSchedules(schedules);
        } else {
            user.setSchedules(new HashSet<>());
        }

        // Assign votes
        if (userDto.getVoteIds() != null && !userDto.getVoteIds().isEmpty()) {
            Set<Vote> votes = userDto.getVoteIds().stream()
                    .map(id -> voteRepository.findById(id)
                            .orElseThrow(() -> new NotFoundException("Vote not found: ID " + id)))
                    .collect(Collectors.toSet());
            user.setVotes(votes);
        }

        User savedUser = userRepository.save(user);
        return mapper.map(savedUser, UserDto.class);
    }

    // GET ALL USERS
    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> mapper.map(user, UserDto.class))
                .collect(Collectors.toList());
    }

    // GET USER BY ID
    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found by this ID"));
        return mapper.map(user, UserDto.class);
    }

    // UPDATE USER
    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found by this ID"));

        // Update basic fields
        existingUser.setEmail(userDto.getEmail());

        // Update courses
        if (userDto.getCourses() != null) {
            Set<Course> courses = userDto.getCourses().stream()
                    .map(dto -> courseRepository.findById(dto.getCourseId())
                            .orElseThrow(() -> new NotFoundException("Course not found: ID " + dto.getCourseId())))
                    .collect(Collectors.toSet());
            existingUser.setCourses(courses);
        }

        // Update schedules
        if (userDto.getSchedules() != null) {
            Set<Schedule> schedules = userDto.getSchedules().stream()
                    .map(dto -> scheduleRepository.findById(dto.getScheduleId())
                            .orElseThrow(() -> new NotFoundException("Schedule not found: ID " + dto.getScheduleId())))
                    .collect(Collectors.toSet());
            existingUser.setSchedules(schedules);
        }

        // Update votes
        if (userDto.getVoteIds() != null) {
            Set<Vote> votes = userDto.getVoteIds().stream()
                    .map(voteId -> voteRepository.findById(voteId)
                            .orElseThrow(() -> new NotFoundException("Vote not found: ID " + voteId)))
                    .collect(Collectors.toSet());
            existingUser.setVotes(votes);
        }

        User updatedUser = userRepository.save(existingUser);
        return mapper.map(updatedUser, UserDto.class);
    }

    // DELETE USER
    @Override
    public Boolean deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new NotFoundException("User not found by this ID");
        }
        userRepository.deleteById(id);
        return true;
    }
}
