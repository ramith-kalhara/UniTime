package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.VoteService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final ProfessorRepository professorRepository;
    private final ModelMapper mapper;

    @PostConstruct
    public void configureMapper() {
        mapper.typeMap(VoteDto.class, Vote.class).addMappings(mapper -> {
            mapper.skip(Vote::setProfessors); // prevent ModelMapper from clearing this
        });
    }

    @Override
    public VoteDto postVote(VoteDto voteDto) {
        Vote vote = mapper.map(voteDto, Vote.class);

        if (voteDto.getProfessorIds() != null && !voteDto.getProfessorIds().isEmpty()) {
            List<Professor> professors = professorRepository.findAllById(voteDto.getProfessorIds());
            vote.setProfessors(professors);
        }

        Vote savedVote = voteRepository.save(vote);

        VoteDto responseDto = mapper.map(savedVote, VoteDto.class);
        if (savedVote.getProfessors() != null) {
            List<Long> ids = savedVote.getProfessors().stream()
                    .map(Professor::getId)
                    .toList();
            responseDto.setProfessorIds(ids);
        }

        return responseDto;
    }
}
