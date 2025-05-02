package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final ProfessorRepository professorRepository;  // Inject ProfessorRepository
    private final ModelMapper mapper;

    // Create course
    @Override
    public CourseDto postCourse(CourseDto courseDto) {
        // Convert DTO to Entity
        Course course = courseDto.toEntity(mapper);

        // Handle Professors: Map ProfessorDtos to Professor entities if present
        if (courseDto.getProfessors() != null) {
            Set<Professor> professors = courseDto.getProfessors().stream()
                    .map(professorDto -> professorRepository.findById(professorDto.getId())  // Assuming ProfessorDto has ID
                            .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + professorDto.getId())))
                    .collect(Collectors.toSet());
            course.setProfessors(professors);
        }

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
        Optional<Course> existingCourseOpt = courseRepository.findById(id);
        if (!existingCourseOpt.isPresent()) {
            throw new NotFoundException("Course not found with ID: " + id);
        }

        Course existingCourse = existingCourseOpt.get();

        // Convert DTO to Entity and preserve the ID
        Course course = courseDto.toEntity(mapper);
        course.setCourseId(id);

        // Handle Professors: Map ProfessorDtos to Professor entities if present
        if (courseDto.getProfessors() != null) {
            Set<Professor> professors = courseDto.getProfessors().stream()
                    .map(professorDto -> professorRepository.findById(professorDto.getId())  // Assuming ProfessorDto has ID
                            .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + professorDto.getId())))
                    .collect(Collectors.toSet());
            course.setProfessors(professors);
        }

        // Save Entity
        Course savedCourse = courseRepository.save(course);

        // Convert back to DTO and return
        return mapper.map(savedCourse, CourseDto.class);
    }

    // Delete course
    @Override
    public Boolean deleteCourse(Long id) {
        courseRepository.deleteById(id);
        return true;
    }
}
