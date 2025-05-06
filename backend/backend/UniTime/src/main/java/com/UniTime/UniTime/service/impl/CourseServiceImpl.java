package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.dto.UserDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ScheduleRepository;
import com.UniTime.UniTime.repository.UserRepository;
import com.UniTime.UniTime.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    // Create course
    @Override
    public CourseDto postCourse(CourseDto courseDto) {
        // Convert DTO to Entity
        Course course = mapper.map(courseDto, Course.class);

        // Handle new schedules before saving the course
        List<Schedule> schedules = new ArrayList<>();
        if (courseDto.getSchedules() != null) {
            for (ScheduleDto scheduleDto : courseDto.getSchedules()) {
                // Ensure scheduleId is null for new schedules
                scheduleDto.setScheduleId(null);  // Explicitly set to null before mapping to the entity

                // If scheduleDto contains an ID, it's an existing schedule, not allowed for a new course
                if (scheduleDto.getScheduleId() != null) {
                    throw new IllegalArgumentException("Cannot attach an existing schedule to a new course.");
                }

                // Create a new schedule from DTO
                Schedule schedule = mapper.map(scheduleDto, Schedule.class);
                schedule.setCourse(course); // Link the schedule to the course
                schedules.add(schedule);
            }
        }

        //  Handle many-to-many Users
        if (courseDto.getUsers() != null && !courseDto.getUsers().isEmpty()) {
            List<User> users = new ArrayList<>();
            for (UserDto ud : courseDto.getUsers()) {
                if (ud.getId() == null) {
                    throw new IllegalArgumentException("User ID is required to enroll in course.");
                }
                User user = userRepository.findById(ud.getId())
                        .orElseThrow(() -> new NotFoundException("User not found with id: " + ud.getId()));
                users.add(user);
                // maintain the inverse side (optional)
                user.getCourses().add(course);
            }
            course.setUsers(users);
        }

        // Set the schedules on the course (cascade will handle saving them)
        course.setSchedules(schedules);

        if (courseDto.getVote() != null) {
            Vote vote = courseDto.getVote().toEntity(mapper);
            course.setVote(vote);
            vote.setCourse(course);
        }

        // Save course and all cascaded schedules
        Course savedCourse = courseRepository.save(course);

        // Return the DTO of the saved course
        return savedCourse.toDto(mapper);
    }





    // Get all courses
    @Override
    public List<CourseDto> getAllCourses() {
        List<Course> courseRepositoryAll = courseRepository.findAll();
        if (courseRepositoryAll.isEmpty()) {
            return new ArrayList<>();
        } else {
            return courseRepositoryAll.stream().map(course -> course.toDto(mapper)).toList();
        }
    }

    // Get course by id
    @Override
    public CourseDto getCourseById(Long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return course.get().toDto(mapper);
        } else {
            throw new NotFoundException("Course not found by this Id");
        }
    }

    // Update course by id
    @Override
    public CourseDto updateCourse(Long id, CourseDto courseDto) {
        Course course = mapper.map(courseDto, Course.class);
        course.setCourseId(id);
        Course savedCourse = courseRepository.save(course);
        return savedCourse.toDto(mapper);
    }

    // Delete course
    @Override
    public Boolean deleteCourse(Long id) {
        courseRepository.deleteById(id);
        return true;
    }
}
