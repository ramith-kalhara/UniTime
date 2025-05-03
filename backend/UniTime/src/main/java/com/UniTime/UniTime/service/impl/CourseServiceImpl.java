package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final ProfessorRepository professorRepository;
    private final ModelMapper mapper;
    private final VoteRepository voteRepository;

    @Override
    public CourseDto postCourse(CourseDto courseDto) {
        // Convert DTO to Entity
        Course course = courseDto.toEntity(mapper);

        // Handle Professors
        if (courseDto.getProfessors() != null) {
            Set<Professor> professors = courseDto.getProfessors().stream()
                    .map(professorDto -> professorRepository.findById(professorDto.getId())
                            .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + professorDto.getId())))
                    .collect(Collectors.toSet());
            course.setProfessors(professors);
        }

        // Save Course first to generate ID
        Course savedCourse = courseRepository.save(course);

        // Handle Vote: if VoteDto is present, map to Vote entity and save it
        if (courseDto.getVote() != null) {
            Vote voteEntity = mapper.map(courseDto.getVote(), Vote.class);
            voteEntity.setCourse(savedCourse); // Set course in Vote
            Vote savedVote = voteRepository.save(voteEntity);
            savedCourse.setVote(savedVote); // Link saved Vote back to Course
            savedCourse = courseRepository.save(savedCourse); // Update course with vote
        }

        return mapper.map(savedCourse, CourseDto.class);
    }

    @Override
    public List<CourseDto> getAllCourses() {
        List<Course> allCourses = courseRepository.findAll();
        return allCourses.stream()
                .map(course -> mapper.map(course, CourseDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Course not found by this Id"));
        return mapper.map(course, CourseDto.class);
    }

    @Override
    public CourseDto updateCourse(Long id, CourseDto courseDto) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Course not found with ID: " + id));

        Course updatedCourse = courseDto.toEntity(mapper);
        updatedCourse.setCourseId(id);

        // Handle Professors
        if (courseDto.getProfessors() != null) {
            Set<Professor> professors = courseDto.getProfessors().stream()
                    .map(professorDto -> professorRepository.findById(professorDto.getId())
                            .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + professorDto.getId())))
                    .collect(Collectors.toSet());
            updatedCourse.setProfessors(professors);
        }

        // Preserve existing vote if none is updated
        if (courseDto.getVote() == null) {
            updatedCourse.setVote(existingCourse.getVote());
        } else {
            Vote voteEntity = mapper.map(courseDto.getVote(), Vote.class);
            voteEntity.setCourse(updatedCourse);
            Vote savedVote = voteRepository.save(voteEntity);
            updatedCourse.setVote(savedVote);
        }

        Course savedCourse = courseRepository.save(updatedCourse);
        return mapper.map(savedCourse, CourseDto.class);
    }

    @Override
    public Boolean deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new NotFoundException("Course not found with ID: " + id);
        }

        voteRepository.findByCourse_CourseId(id).ifPresent(voteRepository::delete);
        courseRepository.deleteById(id);
        return true;
    }
}
