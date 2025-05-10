package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.RoomDto;
import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.Schedule;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.RoomRepository;
import com.UniTime.UniTime.repository.ScheduleRepository;
import com.UniTime.UniTime.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private  final ScheduleRepository scheduleRepository;
    private final ModelMapper mapper;

    //create room
    @Override
    public RoomDto postRoom(RoomDto roomDto, MultipartFile image) throws IOException {
        Room room = roomDto.toEntity(mapper);

        if (image != null && !image.isEmpty()) {
            room.setImageData(image.getBytes());
        }

        Room savedRoom = roomRepository.save(room);

        RoomDto savedDto = savedRoom.toDto(mapper);
        if (savedRoom.getImageData() != null) {
            savedDto.setImageBase64(Base64.getEncoder().encodeToString(savedRoom.getImageData()));
        }

        return savedDto;
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
        Optional<Room> room = roomRepository.findById(id);
        if(room.isPresent()) {
            return room.get().toDto(mapper);
        }else {
            throw new NotFoundException("Room not found by This Id");
        }
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
        // Fetch the room
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Room not found with id: " + id));

        // Delete related schedules
        if (room.getSchedules() != null && !room.getSchedules().isEmpty()) {
            for (Schedule schedule : room.getSchedules()) {
                // delete the schedules before deleting the room
                scheduleRepository.delete(schedule);
            }
        }

        // Delete the room
        roomRepository.deleteById(id);
        return true;
    }

}
