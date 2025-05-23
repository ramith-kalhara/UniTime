package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.UserVoteDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.*;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.UserVoteRepository;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.CourseService;
import com.UniTime.UniTime.service.VoteService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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
    private final UserVoteRepository userVoteRepository;

    private final ModelMapper mapper;

    // Create Vote
    @Override
    public VoteDto postVote(VoteDto voteDto) {
        Vote vote = voteDto.toEntity(mapper);

        // Set associated course properly
        if (voteDto.getCourse() != null && voteDto.getCourse().getCourseId() != null) {
            Course course = courseRepository.findById(voteDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Room not found with id: " + voteDto.getCourse().getCourseId()));
            vote.setCourse(course);
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

        List<UserVote> userVoteEntities = new ArrayList<>();

        if (voteDto.getUserVotes() != null) {
            for (UserVoteDto userVoteDto : voteDto.getUserVotes()) {
                // Treat as new entity: clear any ID
                userVoteDto.setId(null);  // optional, if your DTO has an ID field

                // Ensure professor is valid
                if (userVoteDto.getProfessor() == null || userVoteDto.getProfessor().getId() == null) {
                    throw new IllegalArgumentException("Each UserVote must reference a valid professor.");
                }

                // Fetch professor from DB
                Professor professor = professorRepository.findById(userVoteDto.getProfessor().getId())
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Professor not found with ID: " + userVoteDto.getProfessor().getId()));

                // Map UserVoteDto to entity
                UserVote userVote = mapper.map(userVoteDto, UserVote.class);

                // Set foreign keys
                userVote.setProfessor(professor);
                userVote.setVote(vote);

                userVoteEntities.add(userVote);
            }
        }

        // Attach to vote
        vote.setUserVotes(userVoteEntities);


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

        List<UserVote> userVoteEntities = new ArrayList<>();

        if (voteDto.getUserVotes() != null) {
            for (UserVoteDto userVoteDto : voteDto.getUserVotes()) {
                // Treat as new entity: clear any ID
                userVoteDto.setId(null);  // optional, if your DTO has an ID field

                // Ensure professor is valid
                if (userVoteDto.getProfessor() == null || userVoteDto.getProfessor().getId() == null) {
                    throw new IllegalArgumentException("Each UserVote must reference a valid professor.");
                }

                // Fetch professor from DB
                Professor professor = professorRepository.findById(userVoteDto.getProfessor().getId())
                        .orElseThrow(() -> new EntityNotFoundException(
                                "Professor not found with ID: " + userVoteDto.getProfessor().getId()));

                // Map UserVoteDto to entity
                UserVote userVote = mapper.map(userVoteDto, UserVote.class);

                // Set foreign keys
                userVote.setProfessor(professor);
                userVote.setVote(vote);

                userVoteEntities.add(userVote);
            }
        }

        // Attach to vote
        vote.setUserVotes(userVoteEntities);

        Vote updatedVote = voteRepository.save(vote);
        return updatedVote.toDto(mapper);
    }

    // Delete Vote
    @Override
    @Transactional
    public Boolean deleteVote(Long id) {
        Vote vote = voteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vote not found with ID: " + id));

        //  Break link with Course
        if (vote.getCourse() != null) {
            Course course = vote.getCourse();
            course.setVote(null);         // break course -> vote
            vote.setCourse(null);         // break vote -> course
        }

        //  Detach professors
        for (Professor prof : new ArrayList<>(vote.getProfessors())) {
            prof.setVote(null);
        }
        vote.getProfessors().clear();

        // 3. Detach user votes
        for (UserVote uv : new ArrayList<>(vote.getUserVotes())) {
            uv.setVote(null);
        }
        vote.getUserVotes().clear();

        //  Delete the vote
        voteRepository.delete(vote);
        return true;
    }


}
