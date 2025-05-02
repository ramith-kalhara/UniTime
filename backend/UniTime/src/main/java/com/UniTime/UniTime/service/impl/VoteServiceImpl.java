package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.UserRepository;
import com.UniTime.UniTime.repository.VoteRepository;
import com.UniTime.UniTime.service.VoteService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final ProfessorRepository professorRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    @PostConstruct
    public void configureMapper() {
        mapper.typeMap(VoteDto.class, Vote.class).addMappings(mapper -> {
            mapper.skip(Vote::setProfessors); // prevent ModelMapper from clearing this
        });
    }

    public VoteDto postVote(VoteDto voteDto) {
        Vote vote = new Vote();
        vote.setStart_date(voteDto.getStart_date());
        vote.setEnd_date(voteDto.getEnd_date());
        vote.setStart_time(voteDto.getStart_time());
        vote.setEnd_time(voteDto.getEnd_time());
        vote.setDescription(voteDto.getDescription());
        vote.setCourse_id(voteDto.getCourse_id());

        // Handle professor mapping
        if (voteDto.getProfessorIds() != null) {
            Set<Professor> professors = new HashSet<>(professorRepository.findAllById(voteDto.getProfessorIds()));
            vote.setProfessors(professors);
        }

        // Handle user mapping
        if (voteDto.getUserIds() != null) {
            Set<User> users = new HashSet<>(userRepository.findAllById(voteDto.getUserIds()));
            vote.setUsers(users);
        }

        Vote savedVote = voteRepository.save(vote);

        // Build response DTO
        VoteDto responseDto = new VoteDto();
        responseDto.setId(savedVote.getId());
        responseDto.setStart_date(savedVote.getStart_date());
        responseDto.setEnd_date(savedVote.getEnd_date());
        responseDto.setStart_time(savedVote.getStart_time());
        responseDto.setEnd_time(savedVote.getEnd_time());
        responseDto.setDescription(savedVote.getDescription());
        responseDto.setCourse_id(savedVote.getCourse_id());

        if (savedVote.getProfessors() != null) {
            List<Long> professorIds = savedVote.getProfessors().stream()
                    .map(Professor::getId)
                    .toList();
            responseDto.setProfessorIds(professorIds);
        }

        if (savedVote.getUsers() != null) {
            Set<Long> userIds = savedVote.getUsers().stream()
                    .map(User::getId)
                    .collect(Collectors.toSet());
            responseDto.setUserIds(userIds);
        }

        return responseDto;
    }


}
