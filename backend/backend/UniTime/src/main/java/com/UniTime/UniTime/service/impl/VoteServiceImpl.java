package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.VoteService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final CourseRepository courseRepository;
    private final ProfessorRepository professorRepository;
    private final ModelMapper mapper;

    // Create Vote
    @Override
    public VoteDto postVote(VoteDto voteDto) {
        Vote vote = voteDto.toEntity(mapper);

        // Set associated course properly
        if (voteDto.getCourse() != null) {
            Course course = voteDto.getCourse().toEntity(mapper);
            vote.setCourse(course);
            course.setVote(vote);
        }

        // Fetch existing professors and associate them
        if (voteDto.getProfessors() != null && !voteDto.getProfessors().isEmpty()) {
            List<Professor> attachedProfessors = new ArrayList<>();
            for (ProfessorDto professorDto : voteDto.getProfessors()) {
                if (professorDto.getId() == null) {
                    throw new IllegalArgumentException("Professor ID must not be null when attaching to a vote.");
                }

                // Fetch existing professor from DB
                Professor professor = professorRepository.findById(professorDto.getId())
                        .orElseThrow(() -> new EntityNotFoundException("Professor not found with ID: " + professorDto.getId()));

                // Set the vote for the professor
                professor.setVote(vote);
                attachedProfessors.add(professor);
            }
            vote.setProfessors(attachedProfessors);
        }

        Vote savedVote = voteRepository.save(vote);
        return savedVote.toDto(mapper);
    }


    // Get All Votes
    @Override
    public List<VoteDto> getAllVotes() {
        List<Vote> votes = voteRepository.findAll();
        if (votes.isEmpty()) {
            return new ArrayList<>();
        } else {
            return votes.stream()
                    .map(vote -> vote.toDto(mapper))
                    .collect(Collectors.toList());
        }
    }

    // Get Vote by ID
    @Override
    public VoteDto getVoteById(Long id) {
        Optional<Vote> voteOptional = voteRepository.findById(id);
        if (voteOptional.isPresent()) {
            return voteOptional.get().toDto(mapper);
        } else {
            throw new NotFoundException("Vote not found with ID: " + id);
        }
    }

    // Update Vote
    @Override
    public VoteDto updateVote(Long id, VoteDto voteDto) {
        if (!voteRepository.existsById(id)) {
            throw new NotFoundException("Vote not found with ID: " + id);
        }

        Vote vote = voteDto.toEntity(mapper);
        vote.setId(id); // Ensure your Vote entity has a setId(Long id) method

        Vote updatedVote = voteRepository.save(vote);
        return updatedVote.toDto(mapper);
    }

    // Delete Vote
    @Override
    public Boolean deleteVote(Long id) {
        if (!voteRepository.existsById(id)) {
            throw new NotFoundException("Vote not found with ID: " + id);
        }
        voteRepository.deleteById(id);
        return true;
    }
}
