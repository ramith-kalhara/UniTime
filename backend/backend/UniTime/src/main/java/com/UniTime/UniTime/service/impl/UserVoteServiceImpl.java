package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.UserVoteDto;
import com.UniTime.UniTime.entity.UserVote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.UserVoteRepository;
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
    private final ModelMapper mapper;

    // Create vote
    @Override
    public UserVoteDto postUserVote(UserVoteDto voteDto) {
        UserVote vote = voteDto.toEntity(mapper);
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
