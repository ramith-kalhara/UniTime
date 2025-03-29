package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final ModelMapper mapper;

    @Override
    public VoteDto postVote(VoteDto voteDto) {
        // Convert DTO to Entity
        Vote vote = mapper.map(voteDto, Vote.class);

        // Save Entity
        Vote savedVote = voteRepository.save(vote);

        // Convert back to DTO and return
        return mapper.map(savedVote, VoteDto.class);
    }
}
