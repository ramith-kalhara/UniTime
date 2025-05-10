package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.UserVoteDto;
import com.UniTime.UniTime.service.impl.UserVoteServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/uservote")
@RequiredArgsConstructor
@CrossOrigin
public class UserVoteController {

    private final UserVoteServiceImpl userVoteService;

    // Create vote
    @PostMapping("/create")
    public ResponseEntity<UserVoteDto> postUserVote(@RequestBody UserVoteDto voteDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userVoteService.postUserVote(voteDto));
    }

    // Get all votes
    @GetMapping("/")
    public ResponseEntity<List<UserVoteDto>> getAllUserVotes() {
        return ResponseEntity.status(HttpStatus.OK).body(userVoteService.getAllUserVotes());
    }

    // Get vote by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserVoteDto> getUserVoteById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userVoteService.getUserVoteById(id));
    }

    // Update vote
    @PutMapping("/{id}")
    public ResponseEntity<UserVoteDto> updateUserVote(@PathVariable Long id, @RequestBody UserVoteDto voteDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userVoteService.updateUserVote(id, voteDto));
    }

    // Delete vote
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUserVote(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userVoteService.deleteVote(id));
    }
}
