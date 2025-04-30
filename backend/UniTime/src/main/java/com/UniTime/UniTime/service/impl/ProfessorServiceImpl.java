package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorRepository professorRepository;
    private final ModelMapper mapper;

    // Create Professor
    @Override
    public ProfessorDto postProfessor(ProfessorDto professorDto) {
        // Convert DTO to Entity
        Professor professor = professorDto.toEntity(mapper);

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
            return professors.stream().map(professor -> professor.toDto(mapper)).toList();
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

    // Update Professor by ID
    @Override
    public ProfessorDto updateProfessor(Long id, ProfessorDto professorDto) {
        Professor professor = professorDto.toEntity(mapper);
        professor.setId(id);
        Professor savedProfessor = professorRepository.save(professor);
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
