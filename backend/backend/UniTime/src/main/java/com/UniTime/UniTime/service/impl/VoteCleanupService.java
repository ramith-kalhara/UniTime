package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.repository.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
@Service

public class VoteCleanupService {

    private final VoteRepository voteRepository;
    private final CourseRepository courseRepository;
    private final ProfessorRepository professorRepository;
    private final UserVoteRepository userVoteRepository;

    LocalDateTime now = LocalDateTime.now();



    // Constructor Injection
    public VoteCleanupService(VoteRepository voteRepository, CourseRepository courseRepository,
                              ProfessorRepository professorRepository, UserVoteRepository userVoteRepository) {
        this.voteRepository = voteRepository;
        this.courseRepository = courseRepository;
        this.professorRepository = professorRepository;
        this.userVoteRepository = userVoteRepository;
    }

    // Runs every 2 minutes
    @Scheduled(fixedRate = 120000)
    @Transactional
    public void deleteExpiredVotes() {
        LocalDateTime now = LocalDateTime.now();

        voteRepository.findAll().forEach(vote -> {
            if (vote.getEndTime() != null && vote.getEndTime().isBefore(now)) {
                // Ensure related entities are persisted and clean associations before deletion
                if (vote.getCourse() != null && vote.getCourse().getCourseId() == null) {
                    courseRepository.save(vote.getCourse());
                }

                vote.getProfessors().forEach(professor -> {
                    if (professor.getId() == null) {
                        professorRepository.save(professor);
                    }
                    professor.setVote(null);
                });
                vote.getProfessors().clear();

                vote.getUserVotes().forEach(userVote -> {
                    if (userVote.getId() == null) {
                        userVoteRepository.save(userVote);
                    }
                    userVote.setVote(null);
                });
                vote.getUserVotes().clear();

                if (vote.getCourse() != null) {
                    vote.getCourse().setVote(null);
                }

                voteRepository.delete(vote);
            }
        });
    }

}
