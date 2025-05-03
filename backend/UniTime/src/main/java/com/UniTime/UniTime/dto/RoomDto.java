package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Room;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.Set;

@Data
public class RoomDto {
    private Long id;
    private String department;
    private String description;
    private int capacity;
    private String roomType;
    private boolean smart_screen;
    @JsonIgnore
    private Set<ScheduleDto> schedules;


    public RoomDto toDto(ModelMapper mapper) {
        RoomDto roomDto = mapper.map(this, RoomDto.class);
        // roomDto.setSchedules(...); // if needed
        return roomDto;
    }
    public Room toEntity(ModelMapper mapper) {
        Room room = mapper.map(this, Room.class);
        return room;
    }


}
