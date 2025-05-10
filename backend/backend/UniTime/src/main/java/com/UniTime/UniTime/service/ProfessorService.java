package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.ProfessorDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProfessorService {
    public ProfessorDto postProfessor(ProfessorDto professorDto, MultipartFile image) throws IOException;
    public List<ProfessorDto> getAllProfessors();
    public ProfessorDto getProfessorById(Long id);
    public ProfessorDto updateProfessor(Long id, ProfessorDto professorDto);
    public Boolean deleteProfessor(Long id);
    byte[] generateProfessorPdfReport();
}
