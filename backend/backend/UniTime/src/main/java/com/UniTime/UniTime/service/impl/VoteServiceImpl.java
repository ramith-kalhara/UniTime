package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.VoteService;
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
    private final ModelMapper mapper;

    // Create Vote
    @Override
    public VoteDto postVote(VoteDto voteDto) {
        Vote vote = mapper.map(voteDto, Vote.class);
        Vote savedVote = voteRepository.save(vote);
        return mapper.map(savedVote, VoteDto.class);
    }

    // Get All Votes
    @Override
    public List<VoteDto> getAllVotes() {
        List<Vote> votes = voteRepository.findAll();
        if (votes.isEmpty()) {
            return new ArrayList<>();
        } else {
            return votes.stream()
                    .map(vote -> mapper.map(vote, VoteDto.class))
                    .collect(Collectors.toList());
        }
    }

    // Get Vote by ID
    @Override
    public VoteDto getVoteById(Long id) {
        Optional<Vote> voteOptional = voteRepository.findById(id);
        if (voteOptional.isPresent()) {
            return mapper.map(voteOptional.get(), VoteDto.class);
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

        Vote vote = mapper.map(voteDto, Vote.class);
        vote.setId(id);

        Vote updatedVote = voteRepository.save(vote);
        return mapper.map(updatedVote, VoteDto.class);
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
