package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.UserVoteDto;
import com.UniTime.UniTime.entity.*;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.UserRepository;
import com.UniTime.UniTime.repository.UserVoteRepository;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.UserVoteService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserVoteServiceImpl implements UserVoteService {

    private final UserVoteRepository userVoteRepository;
    private final ProfessorRepository professorRepository;
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    // Create vote
    @Override
    public UserVoteDto postUserVote(UserVoteDto voteDto) {
        UserVote vote = voteDto.toEntity(mapper);

        // Associate Professor
        if (voteDto.getProfessor() != null && voteDto.getProfessor().getId() != null) {
            Long professorId = voteDto.getProfessor().getId();
            System.out.println("professorId: " + professorId);
            Professor professor = professorRepository.findById(professorId)
                    .orElseThrow(() -> new NotFoundException("Professor not found with id: " + professorId));
            vote.setProfessor(professor);
        }

        // Associate Vote
        if (voteDto.getVote() != null && voteDto.getVote().getId() != null) {
            Long voteId = voteDto.getVote().getId();
            System.out.println("voteId: " + voteId);
            Vote existingVote = voteRepository.findById(voteId)
                    .orElseThrow(() -> new NotFoundException("Vote not found with id: " + voteId));
            vote.setVote(existingVote);
        }

        // Associate User
        if (voteDto.getUser() != null && voteDto.getUser().getId() != null) {
            Long userId = voteDto.getUser().getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
            vote.setUser(user);
        }


        UserVote savedVote = userVoteRepository.save(vote);
        return savedVote.toDto(mapper);
    }


    // Get all votes
    @Override
    public List<UserVoteDto> getAllUserVotes() {
        List<UserVote> allVotes = userVoteRepository.findAll();
        if (allVotes.isEmpty()) {
            return new ArrayList<>();
        } else {
            return allVotes.stream().map(v -> v.toDto(mapper)).toList();
        }
    }

    // Get vote by ID
    @Override
    public UserVoteDto getUserVoteById(Long id) {
        Optional<UserVote> vote = userVoteRepository.findById(id);
        if (vote.isPresent()) {
            return vote.get().toDto(mapper);
        } else {
            throw new NotFoundException("UserVote not found by this ID");
        }
    }

    // Update vote by ID
    @Override
    public UserVoteDto updateUserVote(Long id, UserVoteDto voteDto) {
        UserVote vote = voteDto.toEntity(mapper);
        vote.setId(id);


        // Associate Professor
        if (voteDto.getProfessor() != null && voteDto.getProfessor().getId() != null) {
            Long professorId = voteDto.getProfessor().getId();
            System.out.println("professorId: " + professorId);
            Professor professor = professorRepository.findById(professorId)
                    .orElseThrow(() -> new NotFoundException("Professor not found with id: " + professorId));
            vote.setProfessor(professor);
        }

        // Associate Vote
        if (voteDto.getVote() != null && voteDto.getVote().getId() != null) {
            Long voteId = voteDto.getVote().getId();
            System.out.println("voteId: " + voteId);
            Vote existingVote = voteRepository.findById(voteId)
                    .orElseThrow(() -> new NotFoundException("Vote not found with id: " + voteId));
            vote.setVote(existingVote);
        }

        // Associate User
        if (voteDto.getUser() != null && voteDto.getUser().getId() != null) {
            Long userId = voteDto.getUser().getId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
            vote.setUser(user);
        }

        UserVote updatedVote = userVoteRepository.save(vote);
        return updatedVote.toDto(mapper);
    }

    // Delete vote
    @Override
    public Boolean deleteVote(Long id) {
        if (!userVoteRepository.existsById(id)) {
            throw new NotFoundException("UserVote not found for deletion");
        }
        userVoteRepository.deleteById(id);
        return true;
    }
}
