package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.AIScheduleRequest;
import com.UniTime.UniTime.entity.AISchedule;
import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.repository.*;
import com.UniTime.UniTime.service.AIScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class VoteCleanupService {

    private final VoteRepository voteRepository;
    private final CourseRepository courseRepository;
    private final ProfessorRepository professorRepository;
    private final UserVoteRepository userVoteRepository;
    private final RoomRepository roomRepository;
    private final ScheduleRepository scheduleRepository;
    private final AIScheduleRepository aiScheduleRepository;

    @Autowired
    private AIScheduleService aiScheduleService;




    // Constructor Injection
    public VoteCleanupService(VoteRepository voteRepository, CourseRepository courseRepository,
                              ProfessorRepository professorRepository, UserVoteRepository userVoteRepository, RoomRepository roomRepository,ScheduleRepository scheduleRepository , AIScheduleRepository aiScheduleRepository) {
        this.voteRepository = voteRepository;
        this.courseRepository = courseRepository;
        this.professorRepository = professorRepository;
        this.userVoteRepository = userVoteRepository;
        this.roomRepository = roomRepository;
        this.scheduleRepository = scheduleRepository;
        this.aiScheduleRepository = aiScheduleRepository;
    }

    // Runs every 0.5 minutes
    @Scheduled(fixedRate = 30000, initialDelay = 10000) // Waits 10 sec before first run
    @Transactional
    public void deleteExpiredVotes() {
        LocalDateTime now = LocalDateTime.now();

        voteRepository.findAll().forEach(vote -> {
            if (vote.getEndTime() != null && vote.getEndTime().isBefore(now)) {

                //  Get top-voted professor before deleting anything
                List<Long> topProfessorIds = userVoteRepository.findTopVotedProfessorByVoteId(vote.getId());
                Long courseId = (vote.getCourse() != null) ? vote.getCourse().getCourseId() : null;

                if (!topProfessorIds.isEmpty() && courseId != null) {
                    Long topProfessorId = topProfessorIds.get(0);

                    List<Room> scheduledRooms = scheduleRepository.findDistinctRoomIds();
                    List<Room> allRooms = roomRepository.findAll();

                    Room availableRoom = allRooms.stream()
                            .filter(room -> !scheduledRooms.contains(room))
                            .findFirst()
                            .orElse(null);

                    if (availableRoom != null) {
                        AIScheduleRequest request = new AIScheduleRequest();
                        request.setCourseId(courseId);
                        request.setProfessorId(topProfessorId);
                        request.setRoomId(availableRoom.getId());
                        AISchedule aiSchedule = aiScheduleService.generateAndSaveAISchedule(request);

                        // Console log with AI-assigned time slot
                        System.out.println("=========== AI Schedule Created =====");
                        System.out.println("Top Professor ID: " + topProfessorId);
                        System.out.println("Selected Room ID: " + availableRoom.getId());
                        System.out.println("Course ID: " + courseId);
                        System.out.println("Predicted Time Slot from Python: " + aiSchedule.getTimeSlot());
                        System.out.println("========");


                    } else {
                        System.out.println(" No available rooms for Vote ID: " + vote.getId());
                    }
                } else {
                    System.out.println(" No valid top professor or course for Vote ID: " + vote.getId());
                }

                // Clean up associations
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
