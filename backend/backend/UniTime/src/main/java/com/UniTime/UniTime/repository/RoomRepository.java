package com.UniTime.UniTime.repository;

import com.UniTime.UniTime.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  RoomRepository extends JpaRepository<Room, Long> {
}
