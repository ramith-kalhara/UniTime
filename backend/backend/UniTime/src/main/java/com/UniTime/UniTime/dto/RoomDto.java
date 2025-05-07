package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Room;
import jakarta.persistence.Column;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.List;

@Data
public class RoomDto {
    private Long id;
    private String roomName;
    private String department;
    private String description;
    private int capacity;
    private String roomType;
    private boolean smart_screen;

//    private List<ScheduleDto> schedules;


    public Room toEntity(ModelMapper mapper) {
        Room room = mapper.map(this, Room.class);
        return room;
    }
}
