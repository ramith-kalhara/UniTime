package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.VoteDto;

import java.util.List;

public interface VoteService {
    public VoteDto postVote(VoteDto voteDto) ;
    public List<VoteDto> getAllVotes();
    public VoteDto getVoteById(Long id);
    public VoteDto updateVote(Long id, VoteDto voteDto);
    public Boolean deleteVote(Long id);

}
