package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.VoteDto;

import java.util.List;

public interface VoteService {

    // Create a new vote
    VoteDto postVote(VoteDto voteDto);

    // Get all votes (if needed, you can modify this to get votes by a specific criteria)
    List<VoteDto> getAllVotes();

    // Get a specific vote by ID
    VoteDto getVoteById(Long id);

    // Update a vote (if needed, you can add this method)
    VoteDto updateVote(Long id, VoteDto voteDto);

    // Delete a vote by ID
    Boolean deleteVote(Long id);
}
