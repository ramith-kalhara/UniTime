package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.UserVoteDto;

import java.util.List;

public interface UserVoteService {
    UserVoteDto postUserVote(UserVoteDto voteDto);
    List<UserVoteDto> getAllUserVotes();
    UserVoteDto getUserVoteById(Long id);
    UserVoteDto updateUserVote(Long id, UserVoteDto voteDto);
    Boolean deleteVote(Long id);
}
