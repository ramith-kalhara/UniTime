package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.RoomDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface RoomService {
    public RoomDto postRoom(RoomDto roomDto, MultipartFile image ) throws IOException;
    public List<RoomDto> getAllRooms();
    public RoomDto getRoomById(Long id);
    public RoomDto updateRoom(Long id, RoomDto roomDto);
    public Boolean deleteRoom(Long id);

}

