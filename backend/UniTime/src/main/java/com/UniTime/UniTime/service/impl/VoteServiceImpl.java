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
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
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

    // Configure the mapper to handle custom mappings
    @PostConstruct
    public void configureMapper() {
        mapper.typeMap(VoteDto.class, Vote.class).addMappings(mapping -> {
            mapping.skip(Vote::setProfessors); // Skip manual mapping
            mapping.skip(Vote::setUsers);
            mapping.skip(Vote::setCourse);
        });
    }

    // Create Vote
    @Override
    public VoteDto postVote(VoteDto voteDto) {
        // Check if vote for this course already exists
        if (voteRepository.findByCourse_CourseId(voteDto.getCourseId()).isPresent()) {
            throw new IllegalStateException("Vote for this course already exists");
        }

        // Fetch related entities (Professors, Users, and Course)
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


        // Convert DTO to Entity
        Vote vote = voteDto.toEntity(mapper, professors, users, course);



        // Save Vote and return the DTO
        vote = voteRepository.save(vote);
        return vote.toDto(mapper);
    }

    // Get all Votes
    @Override
    public List<VoteDto> getAllVotes() {
        List<Vote> votes = voteRepository.findAll();
        return votes.stream()
                .map(vote -> vote.toDto(mapper))
                .collect(Collectors.toList());
    }

    // Get Vote by ID
    @Override
    public VoteDto getVoteById(Long id) {
        Optional<Vote> vote = voteRepository.findById(id);
        if (vote.isPresent()) {
            return vote.get().toDto(mapper);
        } else {
            throw new NotFoundException("Vote not found with ID: " + id);
        }
    }

    // Update Vote
    @Override
    public VoteDto updateVote(Long id, VoteDto voteDto) {
        // Find the existing vote
        Vote existingVote = voteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vote not found with ID: " + id));

        // Fetch related entities (Professors, Users, and Course)
        Set<Professor> professors = voteDto.getProfessorIds().stream()
                .map(id1 -> professorRepository.findById(id1)
                        .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + id1)))
                .collect(Collectors.toSet());

        Set<User> users = voteDto.getUserIds().stream()
                .map(id2 -> userRepository.findById(id2)
                        .orElseThrow(() -> new NotFoundException("User not found with ID: " + id2)))
                .collect(Collectors.toSet());

        Course course = courseRepository.findById(voteDto.getCourseId())
                .orElseThrow(() -> new NotFoundException("Course not found with ID: " + voteDto.getCourseId()));


        // Update Vote fields with new data
        existingVote.setProfessors(professors);
        existingVote.setUsers(users);
        existingVote.setCourse(course);


        // Save the updated Vote
        Vote updatedVote = voteRepository.save(existingVote);

        // Return updated Vote as DTO
        return updatedVote.toDto(mapper);
    }

    // Delete Vote by ID
    @Transactional
    @Override
    public Boolean deleteVote(Long id) {
        Vote vote = voteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vote not found with ID: " + id));

        // Remove vote from users (both sides)
        for (User user : new HashSet<>(vote.getUsers())) {
            user.getVotes().remove(vote);
        }
        vote.getUsers().clear();

        // Remove vote from professors (optional, as owning side is Vote)
        for (Professor professor : new HashSet<>(vote.getProfessors())) {
            professor.getVotes().remove(vote); // If you maintain both sides in Professor entity
        }
        vote.getProfessors().clear();

        // Unlink from course if present
        vote.setCourse(null);

        // Save cleaned-up state first
        voteRepository.save(vote);

        // Then delete
        voteRepository.delete(vote);

        return true;
    }



}
