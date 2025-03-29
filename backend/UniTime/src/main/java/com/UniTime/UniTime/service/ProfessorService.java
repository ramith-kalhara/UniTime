package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.ProfessorDto;

import java.util.List;

public interface ProfessorService {
    public ProfessorDto postProfessor(ProfessorDto professorDto);
    public List<ProfessorDto> getAllProfessors();
    public ProfessorDto getProfessorById(Long id);
    public ProfessorDto updateProfessor(Long id, ProfessorDto professorDto);
    public Boolean deleteProfessor(Long id);
}
