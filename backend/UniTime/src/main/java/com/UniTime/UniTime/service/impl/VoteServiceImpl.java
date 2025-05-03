package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.UserRepository;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.VoteService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final ProfessorRepository professorRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ModelMapper mapper;

    @PostConstruct
    public void configureMapper() {
        mapper.typeMap(VoteDto.class, Vote.class).addMappings(mapper -> {
            mapper.skip(Vote::setProfessors);
            mapper.skip(Vote::setUsers);
            mapper.skip(Vote::setCourse);
        });
    }

    @Override
    public VoteDto postVote(VoteDto voteDto) {
        if (voteRepository.findByCourse_CourseId(voteDto.getCourseId()).isPresent()) {
            throw new IllegalStateException("Vote for this course already exists");
        }

        // Fetch related entities
        Set<Professor> professors = voteDto.getProfessorIds().stream()
                .map(id -> professorRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + id)))
                .collect(Collectors.toSet());

        Set<User> users = voteDto.getUserIds().stream()
                .map(id -> userRepository.findById(id)
                        .orElseThrow(() -> new NotFoundException("User not found with ID: " + id)))
                .collect(Collectors.toSet());

        Course course = courseRepository.findById(voteDto.getCourseId())
                .orElseThrow(() -> new NotFoundException("Course not found with ID: " + voteDto.getCourseId()));

        // Convert DTO to entity
        Vote vote = voteDto.toEntity(mapper, professors, users, course);

        // Save and return
        vote = voteRepository.save(vote);
        return vote.toDto(mapper);


    }



}
