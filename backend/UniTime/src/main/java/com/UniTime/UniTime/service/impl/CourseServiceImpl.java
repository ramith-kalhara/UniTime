package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
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
    private final ModelMapper mapper;

    // Create course
    @Override
    public CourseDto postCourse(CourseDto courseDto) {
        // Convert DTO to Entity
        Course course = mapper.map(courseDto, Course.class);

        // Save Entity
        Course savedCourse = courseRepository.save(course);

        // Convert back to DTO and return
        return mapper.map(savedCourse, CourseDto.class);
    }

    // Get all courses
    @Override
    public List<CourseDto> getAllCourses() {
        List<Course> courseRepositoryAll = courseRepository.findAll();
        if (courseRepositoryAll.isEmpty()) {
            return new ArrayList<>();
        } else {
            return courseRepositoryAll.stream().map(course -> mapper.map(course, CourseDto.class)).toList();
        }
    }

    // Get course by id
    @Override
    public CourseDto getCourseById(Long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return mapper.map(course.get(), CourseDto.class);
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
        return mapper.map(savedCourse, CourseDto.class);
    }

    // Delete course
    @Override
    public Boolean deleteCourse(Long id) {
        courseRepository.deleteById(id);
        return true;
    }
}
