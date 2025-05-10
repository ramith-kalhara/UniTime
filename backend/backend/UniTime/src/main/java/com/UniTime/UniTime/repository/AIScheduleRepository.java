package com.UniTime.UniTime.repository;

import com.UniTime.UniTime.entity.AISchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AIScheduleRepository extends JpaRepository<AISchedule, Long> {
}
