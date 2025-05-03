package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.RoomDto;
import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.RoomRepository;
import com.UniTime.UniTime.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final ModelMapper mapper;

    //create room
    @Override
    public RoomDto postRoom(RoomDto roomDto) {
        //Convert DTO to Entity
        Room room = mapper.map(roomDto, Room.class);

        //save Entity
        Room savedRoom = roomRepository.save(room);

        // Convert back to DTO and return
        return mapper.map(savedRoom, RoomDto.class);
    }

    //get all room
    @Override
    public List<RoomDto> getAllRooms() {
        List<Room> roomRepositoryAll = roomRepository.findAll();
        if (roomRepositoryAll.isEmpty()) {
            return new ArrayList<>();
        }else {
            return roomRepositoryAll.stream().map(room -> room.toDto(mapper)).toList();
        }
    }

    //get room by id
    @Override
    public RoomDto getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Room not found by This Id"));
        return room.toDto(mapper); // Assuming toDto handles schedules if required
    }


    //Room update by id
    @Override
    public RoomDto updateRoom(Long id, RoomDto roomDto) {
        Room room = roomDto.toEntity(mapper);
        room.setId(id);
        Room saverRoom = roomRepository.save(room);
        return saverRoom.toDto(mapper);
    }

    //delete room
    @Override
    public Boolean deleteRoom(Long id) {
        roomRepository.deleteById(id);
        return true;
    }
}
