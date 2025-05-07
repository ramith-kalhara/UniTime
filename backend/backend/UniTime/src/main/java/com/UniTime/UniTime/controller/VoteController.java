package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.service.impl.VoteServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/vote")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VoteController {

    private final VoteServiceImpl voteService;

    // Create Vote
    @PostMapping("/create")
    public ResponseEntity<VoteDto> postVote(@RequestBody VoteDto voteDto) {
        return ResponseEntity.status(HttpStatus.OK).body(voteService.postVote(voteDto));
    }

    // Get all Votes
    @GetMapping("/")
    public ResponseEntity<List<VoteDto>> getAllVotes() {
        return ResponseEntity.status(HttpStatus.OK).body(voteService.getAllVotes());
    }

    // Get Vote by ID
    @GetMapping("/{id}")
    public ResponseEntity<VoteDto> getVoteById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(voteService.getVoteById(id));
    }

    // Update Vote by ID
    @PutMapping("/{id}")
    public ResponseEntity<VoteDto> updateVote(@PathVariable Long id, @RequestBody VoteDto voteDto) {
        return ResponseEntity.status(HttpStatus.OK).body(voteService.updateVote(id, voteDto));
    }

    // Delete Vote by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteVote(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(voteService.deleteVote(id));
    }
}
