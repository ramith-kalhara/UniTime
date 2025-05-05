package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
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
    private final CourseRepository courseRepository;
    private final ModelMapper mapper;

    // Create Vote
    @Override
    public VoteDto postVote(VoteDto voteDto) {
        Vote vote = voteDto.toEntity(mapper);


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
