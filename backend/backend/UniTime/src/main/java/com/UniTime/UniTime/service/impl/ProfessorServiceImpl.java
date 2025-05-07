package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.dto.UserVoteDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.*;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.*;
import com.UniTime.UniTime.service.ProfessorService;
import com.UniTime.UniTime.service.UserVoteService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfessorServiceImpl implements ProfessorService {

    private final ProfessorRepository professorRepository;
    private final CourseRepository courseRepository;
    private final VoteRepository voteRepository;
    private final RoomRepository roomRepository;
    private final UserVoteService userVoteService;
    private final ScheduleRepository scheduleRepository;
    private final ModelMapper mapper;

    // Create Professor
    @Override
    public ProfessorDto postProfessor(ProfessorDto professorDto) {
        // Convert DTO to Entity without userVote list
        Professor professor = professorDto.toEntity(mapper);

        // Set Course
        if (professorDto.getCourse() != null) {
            Course course = courseRepository.findById(professorDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found"));
            professor.setCourse(course);
        }

        // Set Vote
        if (professorDto.getVote() != null && professorDto.getVote().getId() != null) {
            Vote vote = voteRepository.findById(professorDto.getVote().getId())
                    .orElseThrow(() -> new NotFoundException("Vote not found"));
            professor.setVote(vote);
        }

        // Handle UserVotes manually
        List<UserVote> userVotes = new ArrayList<>();
        if (professorDto.getUserVote() != null) {
            for (UserVoteDto userVoteDto : professorDto.getUserVote()) {
                UserVote userVote = new UserVote();
                userVote.setProfessor(professor); // attach the professor reference
                userVotes.add(userVote);
            }
        }
        professor.setUserVote(userVotes); // attach votes to professor

        // Save professor first to get the ID (important before setting relationships that need ID)
        Professor savedProfessor = professorRepository.save(professor);

        // Handle schedules after saving professor
        List<Schedule> schedules = new ArrayList<>();
        if (professorDto.getSchedules() != null) {
            for (ScheduleDto scheduleDto : professorDto.getSchedules()) {
                Schedule schedule;

                if (scheduleDto.getScheduleId() != null) {
                    // Fetch and update existing schedule
                    schedule = scheduleRepository.findById(scheduleDto.getScheduleId())
                            .orElseThrow(() -> new NotFoundException("Schedule not found with id: " + scheduleDto.getScheduleId()));
                } else {
                    // Create new schedule from DTO
                    schedule = mapper.map(scheduleDto, Schedule.class);
                }

                // Set the professor (new or existing)
                schedule.setProfessor(savedProfessor);
                schedules.add(schedule);
            }

            // Save all new or updated schedules
            scheduleRepository.saveAll(schedules);
            System.out.println("Final Schedule Entities: " + schedules);

        }


        // Now update savedProfessor with the schedule list (optional)
        savedProfessor.setSchedules(schedules);
        System.out.println( "Schedule : " + schedules);

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

        // Check if the course is provided and exists, if not, create or retrieve it
        if (professorDto.getCourse() != null) {
            Course course = courseRepository.findById(professorDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found with id: " + professorDto.getCourse().getCourseId()));

            // Set the course to the professor
            professor.setCourse(course);
        }

        // 🔹 Handle Vote
        if (professorDto.getVote() != null && professorDto.getVote().getId() != null) {
            Long voteId = professorDto.getVote().getId();
            Vote vote = voteRepository.findById(voteId)
                    .orElseThrow(() -> new NotFoundException("Vote not found with id: " + voteId));
            professor.setVote(vote);
        }

        // Handle UserVotes manually
        List<UserVote> userVotes = new ArrayList<>();
        if (professorDto.getUserVote() != null) {
            for (UserVoteDto userVoteDto : professorDto.getUserVote()) {
                UserVote userVote = new UserVote();
                userVote.setProfessor(professor); // attach the professor reference
                userVotes.add(userVote);
            }
        }
        professor.setUserVote(userVotes); // attach votes to professor

        // Save professor first to get the ID (important before setting relationships that need ID)
        Professor savedProfessor = professorRepository.save(professor);

        // Handle schedules after saving professor
        List<Schedule> schedules = new ArrayList<>();
        if (professorDto.getSchedules() != null) {
            for (ScheduleDto scheduleDto : professorDto.getSchedules()) {
                Schedule schedule;

                if (scheduleDto.getScheduleId() != null) {
                    // Fetch and update existing schedule
                    schedule = scheduleRepository.findById(scheduleDto.getScheduleId())
                            .orElseThrow(() -> new NotFoundException("Schedule not found with id: " + scheduleDto.getScheduleId()));
                } else {
                    // Create new schedule from DTO
                    schedule = mapper.map(scheduleDto, Schedule.class);
                }

                // Set the professor (new or existing)
                schedule.setProfessor(savedProfessor);
                schedules.add(schedule);
            }

            // Save all new or updated schedules
            scheduleRepository.saveAll(schedules);
            System.out.println("Final Schedule Entities: " + schedules);

        }


        // Now update savedProfessor with the schedule list (optional)
        savedProfessor.setSchedules(schedules);
        System.out.println( "Schedule : " + schedules);

//        Professor savedProfessor = professorRepository.save(professor);
        return savedProfessor.toDto(mapper);
    }

    // Delete Professor by ID
    @Override
    public Boolean deleteProfessor(Long id) {
        Professor professor = professorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Professor not found with ID: " + id));

        // Remove from vote’s list
        if (professor.getVote() != null) {
            Vote vote = professor.getVote();
            vote.getProfessors().remove(professor);
            professor.setVote(null);
        }

        // Remove from course’s list
        if (professor.getCourse() != null) {
            Course course = professor.getCourse();
            course.getProfessors().remove(professor);
            professor.setCourse(null);
        }

        // Break links with userVotes
        for (UserVote uv : professor.getUserVote()) {
            uv.setProfessor(null);
        }
        professor.getUserVote().clear();

        // Break links with schedules and users properly
        for (Schedule sch : new ArrayList<>(professor.getSchedules())) {
            // Detach users from schedule (break many-to-many)
            if (sch.getUsers() != null) {
                for (User u : new ArrayList<>(sch.getUsers())) {
                    u.getSchedules().remove(sch); // remove schedule from user side
                }
                sch.getUsers().clear(); // clear users from schedule side
            }

            // Detach other references
            sch.setProfessor(null);
            sch.setRoom(null);
            sch.setCourse(null);
        }

        // Now clear professor's schedules (triggers orphan removal)
        professor.getSchedules().clear();

        // Finally, delete professor
        professorRepository.delete(professor);
        return true;
    }



}
