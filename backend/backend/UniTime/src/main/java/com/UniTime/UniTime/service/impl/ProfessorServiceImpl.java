package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.UserVoteDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.*;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.ProfessorService;
import com.UniTime.UniTime.service.UserVoteService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorRepository professorRepository;
    private final CourseRepository courseRepository;
    private final VoteRepository voteRepository;
    private final UserVoteService userVoteService;
    private final ModelMapper mapper;

    // Create Professor
    @Override
    public ProfessorDto postProfessor(ProfessorDto professorDto) {
        // Convert DTO to Entity without userVote list
        Professor professor = professorDto.toEntity(mapper);

        // Set Course
        if (professorDto.getCourse() != null) {
            Course course = courseRepository.findById(professorDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found"));
            professor.setCourse(course);
        }

        // Set Vote
        if (professorDto.getVote() != null && professorDto.getVote().getId() != null) {
            Vote vote = voteRepository.findById(professorDto.getVote().getId())
                    .orElseThrow(() -> new NotFoundException("Vote not found"));
            professor.setVote(vote);
        }

        // 🔹 Handle userVote list manually
        List<UserVote> userVotes = new ArrayList<>();
        if (professorDto.getUserVote() != null) {
            for (UserVoteDto userVoteDto : professorDto.getUserVote()) {
//                User user = userVoteService.findById(userVoteDto.getUser().getId())
//                        .orElseThrow(() -> new NotFoundException("User not found"));
//
//                Vote vote = voteRepository.findById(userVoteDto.getVote().getId())
//                        .orElseThrow(() -> new NotFoundException("Vote not found"));

                UserVote userVote = new UserVote();
//                userVote.setUser(user);
//                userVote.setVote(vote);
                userVote.setProfessor(professor);

                userVotes.add(userVote);
            }
        }

        professor.setUserVote(userVotes); // attach to professor

        // Save
        Professor savedProfessor = professorRepository.save(professor);

        return savedProfessor.toDto(mapper);
    }


    // Get all Professors
    @Override
    public List<ProfessorDto> getAllProfessors() {
        List<Professor> professors = professorRepository.findAll();
        if (professors.isEmpty()) {
            return new ArrayList<>();
        } else {
            return professors.stream().map(professor -> professor.toDto(mapper)).toList();
        }
    }

    // Get Professor by ID
    @Override
    public ProfessorDto getProfessorById(Long id) {
        Optional<Professor> professor = professorRepository.findById(id);
        if (professor.isPresent()) {
            return professor.get().toDto(mapper);
        } else {
            throw new NotFoundException("Professor not found with ID: " + id);
        }
    }

    // Update Professor by ID
    @Override
    public ProfessorDto updateProfessor(Long id, ProfessorDto professorDto) {
        Professor professor = professorDto.toEntity(mapper);
        professor.setId(id);

        // Check if the course is provided and exists, if not, create or retrieve it
        if (professorDto.getCourse() != null) {
            Course course = courseRepository.findById(professorDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found with id: " + professorDto.getCourse().getCourseId()));

            // Set the course to the professor
            professor.setCourse(course);
        }

        // 🔹 Handle Vote
        if (professorDto.getVote() != null && professorDto.getVote().getId() != null) {
            Long voteId = professorDto.getVote().getId();
            Vote vote = voteRepository.findById(voteId)
                    .orElseThrow(() -> new NotFoundException("Vote not found with id: " + voteId));
            professor.setVote(vote);
        }

        Professor savedProfessor = professorRepository.save(professor);
        return savedProfessor.toDto(mapper);
    }

    // Delete Professor by ID
    @Override
    public Boolean deleteProfessor(Long id) {
        if (!professorRepository.existsById(id)) {
            throw new NotFoundException("Professor not found with ID: " + id);
        }
        professorRepository.deleteById(id);
        return true;
    }
}
