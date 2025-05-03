package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Override
    public CourseDto postCourse(CourseDto courseDto) {
        Course course = courseDto.toEntity(mapper);
        System.out.println("come");
        System.out.println(course.getCourseCode());

        // Save Course first to get an ID
        Course savedCourse = courseRepository.save(course);
        System.out.println(savedCourse.getCourseId());

        //  Handle Professors (bidirectional link)
        if (courseDto.getProfessors() != null) {
            Set<Professor> professors = new HashSet<>();  // Store updated professors here

            // Iterate over professors and update each one
            for (ProfessorDto professorDto : courseDto.getProfessors()) {
                Professor professor = professorRepository.findById(professorDto.getId())
                        .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + professorDto.getId()));

                professor.setCourse(savedCourse); // Correct assignment

                professorRepository.save(professor);
                professors.add(professor);
            }
            savedCourse.setProfessors(professors);


            savedCourse.setProfessors(professors); // Set professors to the course after saving
        }

        //  Handle Vote
        if (courseDto.getVote() != null) {
            Vote voteEntity = mapper.map(courseDto.getVote(), Vote.class);
            voteEntity.setCourse(savedCourse);
            Vote savedVote = voteRepository.save(voteEntity);
            savedCourse.setVote(savedVote);
            savedCourse = courseRepository.save(savedCourse); // Save course with vote
        }

        // Handle Users
        if (courseDto.getUsers() != null) {
            Set<User> users = courseDto.getUsers().stream()
                    .map(userDto -> userRepository.findById(userDto.getId())
                            .orElseThrow(() -> new NotFoundException("User not found with ID: " + userDto.getId())))
                    .collect(Collectors.toSet());
            savedCourse.setUsers(users);
            savedCourse = courseRepository.save(savedCourse); // Save course with users
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

        //  Handle Professors (bidirectional update)
        if (courseDto.getProfessors() != null) {
            Set<Professor> professors = courseDto.getProfessors().stream()
                    .map(professorDto -> {
                        Professor professor = professorRepository.findById(professorDto.getId())
                                .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + professorDto.getId()));
                        professor.setCourse(updatedCourse); // update the course reference
                        return professorRepository.save(professor);
                    })
                    .collect(Collectors.toSet());
            updatedCourse.setProfessors(professors);
        } else {
            updatedCourse.setProfessors(existingCourse.getProfessors());
        }

        //  Handle Vote
        if (courseDto.getVote() != null) {
            Vote voteEntity = mapper.map(courseDto.getVote(), Vote.class);
            voteEntity.setCourse(updatedCourse);
            Vote savedVote = voteRepository.save(voteEntity);
            updatedCourse.setVote(savedVote);
        } else {
            updatedCourse.setVote(existingCourse.getVote());
        }

        //  Handle Users
        if (courseDto.getUsers() != null) {
            Set<User> users = courseDto.getUsers().stream()
                    .map(userDto -> userRepository.findById(userDto.getId())
                            .orElseThrow(() -> new NotFoundException("User not found with ID: " + userDto.getId())))
                    .collect(Collectors.toSet());
            updatedCourse.setUsers(users);
        } else {
            updatedCourse.setUsers(existingCourse.getUsers());
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
