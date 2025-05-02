package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.RoomDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.service.RoomService;
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


    //create Vote
    @PostMapping("/create")
    public ResponseEntity<VoteDto> postVote(@RequestBody VoteDto voteDto){
        return ResponseEntity.status(HttpStatus.OK).body(voteService.postVote(voteDto));
    }


}
