package com.UniTime.UniTime.repository;

import com.UniTime.UniTime.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface VoteRepository extends JpaRepository<Vote,Long> {
    void deleteByEndTimeBefore(LocalDateTime endTime);

}
