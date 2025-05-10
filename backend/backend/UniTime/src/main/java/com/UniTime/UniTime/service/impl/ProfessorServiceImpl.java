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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
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
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    // Create Professor
    @Override
    public ProfessorDto postProfessor(ProfessorDto professorDto, MultipartFile image) throws IOException {
        // Convert DTO to Entity
        Professor professor = professorDto.toEntity(mapper);

        // Handle Image
        if (image != null && !image.isEmpty()) {
            professor.setImageData(image.getBytes());
        }

        // Set Course
        if (professorDto.getCourse() != null && professorDto.getCourse().getCourseId() != null) {
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
                userVote.setProfessor(professor);  // link to professor
                userVotes.add(userVote);
            }
        }
        professor.setUserVote(userVotes);

        // Save professor first
        Professor savedProfessor = professorRepository.save(professor);

        // Handle Schedules
        List<Schedule> schedules = new ArrayList<>();
        if (professorDto.getSchedules() != null) {
            for (ScheduleDto scheduleDto : professorDto.getSchedules()) {
                Schedule schedule;

                if (scheduleDto.getScheduleId() != null) {
                    schedule = scheduleRepository.findById(scheduleDto.getScheduleId())
                            .orElseThrow(() -> new NotFoundException("Schedule not found with id: " + scheduleDto.getScheduleId()));
                } else {
                    schedule = mapper.map(scheduleDto, Schedule.class);
                }

                schedule.setProfessor(savedProfessor);
                schedules.add(schedule);
            }
            scheduleRepository.saveAll(schedules);
            savedProfessor.setSchedules(schedules);
        }

        // Convert saved professor to DTO and encode image
        ProfessorDto savedDto = savedProfessor.toDto(mapper);
        if (savedProfessor.getImageData() != null) {
            savedDto.setImageBase64(Base64.getEncoder().encodeToString(savedProfessor.getImageData()));
        }

        return savedDto;
    }


    // Get all Professors
    @Override
    public List<ProfessorDto> getAllProfessors() {
        return professorRepository.findAll().stream()
                .map(professor -> {
                    ProfessorDto dto = professor.toDto(mapper);
                    if (professor.getImageData() != null) {
                        dto.setImageBase64(Base64.getEncoder().encodeToString(professor.getImageData()));
                    }
                    return dto;
                })
                .collect(Collectors.toList());
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
    @Transactional
    public ProfessorDto updateProfessor(Long id, ProfessorDto professorDto) {
        Professor professor = professorDto.toEntity(mapper);
        professor.setId(id);

        // 🔹 Link course if exists
        if (professorDto.getCourse() != null) {
            Course course = courseRepository.findById(professorDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found with id: " + professorDto.getCourse().getCourseId()));
            professor.setCourse(course);
        }

        // 🔹 Link vote if exists
        if (professorDto.getVote() != null && professorDto.getVote().getId() != null) {
            Long voteId = professorDto.getVote().getId();
            Vote vote = voteRepository.findById(voteId)
                    .orElseThrow(() -> new NotFoundException("Vote not found with id: " + voteId));
            professor.setVote(vote);
        }

        // 🔹 Link user votes
        List<UserVote> userVotes = new ArrayList<>();
        if (professorDto.getUserVote() != null) {
            for (UserVoteDto userVoteDto : professorDto.getUserVote()) {
                UserVote userVote = new UserVote();
                userVote.setProfessor(professor);
                userVotes.add(userVote);
            }
        }
        professor.setUserVote(userVotes);

        // 🔹 Save the professor first to ensure ID is available
        Professor savedProfessor = professorRepository.save(professor);

        // 🔹 Process schedules
        List<Schedule> updatedSchedules = new ArrayList<>();
        if (professorDto.getSchedules() != null) {
            for (ScheduleDto scheduleDto : professorDto.getSchedules()) {
                Schedule schedule;

                if (scheduleDto.getScheduleId() != null) {
                    // Fetch existing schedule
                    schedule = scheduleRepository.findById(scheduleDto.getScheduleId())
                            .orElseThrow(() -> new NotFoundException("Schedule not found with id: " + scheduleDto.getScheduleId()));

                    // Detach schedule from users
                    if (schedule.getUsers() != null && !schedule.getUsers().isEmpty()) {
                        for (User user : new ArrayList<>(schedule.getUsers())) {
                            user.getSchedules().remove(schedule);
                            userRepository.save(user);
                        }
                        schedule.getUsers().clear();
                    }
                } else {
                    // Create new schedule
                    schedule = mapper.map(scheduleDto, Schedule.class);
                }

                // Link professor to schedule
                schedule.setProfessor(savedProfessor);
                updatedSchedules.add(schedule);
            }

            // Save all schedules after processing
            scheduleRepository.saveAll(updatedSchedules);
            savedProfessor.setSchedules(updatedSchedules);
        }

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
