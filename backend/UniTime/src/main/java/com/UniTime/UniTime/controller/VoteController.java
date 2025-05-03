package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.VoteRepository;
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
    private final VoteRepository voteRepository;

    // Create Vote
    @PostMapping("/create")
    public ResponseEntity<VoteDto> postVote(@RequestBody VoteDto voteDto) {
        // Call the service to create and return the complete VoteDto
        VoteDto createdVoteDto = voteService.postVote(voteDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVoteDto); // Return 201 Created with full VoteDto
    }

    // Get all Votes
    @GetMapping("/")
    public ResponseEntity<List<VoteDto>> getAllVotes() {
        List<VoteDto> voteDtos = voteService.getAllVotes();
        if (voteDtos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(voteDtos);
        }
        return ResponseEntity.status(HttpStatus.OK).body(voteDtos);
    }

    // Get Vote by ID
    @GetMapping("/{id}")
    public ResponseEntity<VoteDto> getVoteById(@PathVariable Long id) {
        VoteDto voteDto = voteService.getVoteById(id);
        if (voteDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(voteDto);
    }

    // Update Vote by ID
    @PutMapping("/{id}")
    public ResponseEntity<VoteDto> updateVote(@PathVariable Long id, @RequestBody VoteDto voteDto) {
        VoteDto updatedVoteDto = voteService.updateVote(id, voteDto);
        if (updatedVoteDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(updatedVoteDto);
    }

    // Delete Vote by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteVote(@PathVariable Long id) {
        try {
            voteService.deleteVote(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            e.printStackTrace(); // <== add this for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }


}
