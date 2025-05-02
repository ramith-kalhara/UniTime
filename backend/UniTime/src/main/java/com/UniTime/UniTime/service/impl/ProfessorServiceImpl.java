package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.VoteRepository; // Assuming you have this repository
import com.UniTime.UniTime.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorRepository professorRepository;
    private final VoteRepository voteRepository; // Injecting the Vote repository
    private final CourseRepository courseRepository;
    private final ModelMapper mapper;

    // Create Professor
    @Override
    public ProfessorDto postProfessor(ProfessorDto professorDto) {
        // Convert DTO to Entity
        Professor professor = professorDto.toEntity(mapper);

        // Handle Votes: Map VoteDtos to Vote entities if present
        if (professorDto.getVotes() != null) {
            Set<Vote> votes = professorDto.getVotes().stream()
                    .map(voteDto -> voteRepository.findById(voteDto.getId())  // Assuming VoteDto has ID
                            .orElseThrow(() -> new NotFoundException("Vote not found with ID: " + voteDto.getId())))
                    .collect(Collectors.toSet());
            professor.setVotes(votes);
        }

        // Save Entity
        Professor savedProfessor = professorRepository.save(professor);

        // Convert back to DTO and return
        return savedProfessor.toDto(mapper);
    }


    // Get all Professors
    @Override
    public List<ProfessorDto> getAllProfessors() {
        List<Professor> professors = professorRepository.findAll();
        if (professors.isEmpty()) {
            return new ArrayList<>();
        } else {
            return professors.stream()
                    .map(professor -> professor.toDto(mapper))
                    .collect(Collectors.toList());
        }
    }

    // Get Professor by ID
    @Override
    public ProfessorDto getProfessorById(Long id) {
        Optional<Professor> professor = professorRepository.findById(id);
        if (professor.isPresent()) {
            return professor.get().toDto(mapper);
        } else {
            throw new NotFoundException("Professor not found with ID: " + id);
        }
    }


    //update professor
    @Override
    public ProfessorDto updateProfessor(Long id, ProfessorDto professorDto) {
        Optional<Professor> existingProfessorOpt = professorRepository.findById(id);
        if (!existingProfessorOpt.isPresent()) {
            throw new NotFoundException("Professor not found with ID: " + id);
        }

        Professor existingProfessor = existingProfessorOpt.get();

        // Convert DTO to Entity and preserve the ID
        Professor professor = professorDto.toEntity(mapper);
        professor.setId(id);

        // Handle Votes: Map VoteDtos to Vote entities if present
        if (professorDto.getVotes() != null) {
            Set<Vote> votes = professorDto.getVotes().stream()
                    .map(voteDto -> voteRepository.findById(voteDto.getId())  // Assuming VoteDto has ID
                            .orElseThrow(() -> new NotFoundException("Vote not found with ID: " + voteDto.getId())))
                    .collect(Collectors.toSet());
            professor.setVotes(votes);
        }



        // Save Entity
        Professor savedProfessor = professorRepository.save(professor);

        // Convert back to DTO and return
        return savedProfessor.toDto(mapper);
    }


    // Delete Professor by ID
    @Override
    public Boolean deleteProfessor(Long id) {
        if (!professorRepository.existsById(id)) {
            throw new NotFoundException("Professor not found with ID: " + id);
        }
        professorRepository.deleteById(id);
        return true;
    }
}
