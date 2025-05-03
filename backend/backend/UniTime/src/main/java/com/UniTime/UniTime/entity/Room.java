package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.RoomDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "department", nullable = false, length = 100)
    private String department;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name = "room_type", nullable = false)
    private String roomType;

    @Column(name = "has_smart_screen", nullable = false)
    private boolean smart_screen;

    public RoomDto toDto(ModelMapper mapper) {
        RoomDto roomDto = mapper.map(this, RoomDto.class);
        return roomDto;
    }
}
