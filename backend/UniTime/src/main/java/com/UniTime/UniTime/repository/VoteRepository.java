package com.UniTime.UniTime.repository;

import com.UniTime.UniTime.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote,Long> {
    // Method to find a Vote by courseId
    Optional<Vote> findByCourse_CourseId(Long courseId);

}
