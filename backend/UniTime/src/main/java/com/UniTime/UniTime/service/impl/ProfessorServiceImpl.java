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
        System.out.println(professor.getAddress());

        //  Handle Course: Get course entity by ID
        if (professorDto.getCourse() != null && professorDto.getCourse().getCourseId() != null) {
            System.out.println(professor.getAddress());
            Course course = courseRepository.findById(professorDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found with ID: " + professorDto.getCourse().getCourseId()));
            professor.setCourse(course);
        }

        // Handle Votes if present
        if (professorDto.getVotes() != null) {
            System.out.println(professorDto.getVotes());
            System.out.println("come----------------------------------");
            Set<Vote> votes = professorDto.getVotes().stream()
                    .map(voteDto -> voteRepository.findById(voteDto.getId())
                            .orElseThrow(() -> new NotFoundException("Vote not found with ID: " + voteDto.getId())))
                    .collect(Collectors.toSet());
            professor.setVotes(votes);
        }

        // Save and return
        Professor savedProfessor = professorRepository.save(professor);
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
        Professor existingProfessor = professorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + id));

        // Map updated fields
        Professor updatedProfessor = professorDto.toEntity(mapper);
        updatedProfessor.setId(id); // Preserve ID

        //  Preserve/Set Course
        if (professorDto.getCourse() != null && professorDto.getCourse().getCourseId() != null) {
            Course course = courseRepository.findById(professorDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found with ID: " + professorDto.getCourse().getCourseId()));
            updatedProfessor.setCourse(course);
        } else {
            updatedProfessor.setCourse(existingProfessor.getCourse());
        }

        //  Handle Votes
        if (professorDto.getVotes() != null) {
            Set<Vote> votes = professorDto.getVotes().stream()
                    .map(voteDto -> voteRepository.findById(voteDto.getId())
                            .orElseThrow(() -> new NotFoundException("Vote not found with ID: " + voteDto.getId())))
                    .collect(Collectors.toSet());
            updatedProfessor.setVotes(votes);
        } else {
            updatedProfessor.setVotes(existingProfessor.getVotes());
        }

        // Optionally: Preserve schedules or other associations if needed
        updatedProfessor.setSchedules(existingProfessor.getSchedules());

        // Save and return
        Professor savedProfessor = professorRepository.save(updatedProfessor);
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

