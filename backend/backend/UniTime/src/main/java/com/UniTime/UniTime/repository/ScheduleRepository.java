package com.UniTime.UniTime.repository;

import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("SELECT DISTINCT s.room FROM Schedule s")
    List<Room> findDistinctRoomIds();

}
