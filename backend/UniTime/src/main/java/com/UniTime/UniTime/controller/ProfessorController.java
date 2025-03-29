package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.service.impl.ProfessorServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/professor")
@RequiredArgsConstructor
@CrossOrigin
public class ProfessorController {

    private final ProfessorServiceImpl professorService;

    // Create Professor
    @PostMapping("/create")
    public ResponseEntity<ProfessorDto> postProfessor(@RequestBody ProfessorDto professorDto) {
        return ResponseEntity.status(HttpStatus.OK).body(professorService.postProfessor(professorDto));
    }

    // Get all Professors
    @GetMapping("/")
    public ResponseEntity<List<ProfessorDto>> getAllProfessors() {
        return ResponseEntity.status(HttpStatus.OK).body(professorService.getAllProfessors());
    }

    // Get Professor by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDto> getProfessorById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(professorService.getProfessorById(id));
    }

    // Update Professor by ID
    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDto> updateProfessor(@PathVariable Long id, @RequestBody ProfessorDto professorDto) {
        return ResponseEntity.status(HttpStatus.OK).body(professorService.updateProfessor(id, professorDto));
    }

    // Delete Professor by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteProfessor(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(professorService.deleteProfessor(id));
    }
}
