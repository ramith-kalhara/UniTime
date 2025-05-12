package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.dto.UserDto;
import com.UniTime.UniTime.entity.*;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.*;
import com.UniTime.UniTime.service.ScheduleService;
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

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Chunk;
import com.lowagie.text.Image;
import com.lowagie.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final RoomRepository roomRepository;
    private final ProfessorRepository professorRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    private final ModelMapper mapper;

    // Create schedule


    @Override
    public ScheduleDto postSchedule(ScheduleDto scheduleDto, MultipartFile image) throws IOException {
        // Convert DTO to Entity
        Schedule schedule = scheduleDto.toEntity(mapper);

        // Handle Image
        if (image != null && !image.isEmpty()) {
            schedule.setImageData(image.getBytes());
        }

        // Set Room
        if (scheduleDto.getRoom() != null && scheduleDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(scheduleDto.getRoom().getId())
                    .orElseThrow(() -> new NotFoundException("Room not found with id: " + scheduleDto.getRoom().getId()));
            schedule.setRoom(room);
        }

        // Set Professor
        if (scheduleDto.getProfessor() != null && scheduleDto.getProfessor().getId() != null) {
            Professor professor = professorRepository.findById(scheduleDto.getProfessor().getId())
                    .orElseThrow(() -> new NotFoundException("Professor not found with id: " + scheduleDto.getProfessor().getId()));
            schedule.setProfessor(professor);
        }

        // Set Course
        if (scheduleDto.getCourse() != null && scheduleDto.getCourse().getCourseId() != null) {
            Course course = courseRepository.findById(scheduleDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found with id: " + scheduleDto.getCourse().getCourseId()));
            schedule.setCourse(course);
        }

        // Set Users
        if (scheduleDto.getUsers() != null && !scheduleDto.getUsers().isEmpty()) {
            List<User> attendees = new ArrayList<>();
            for (UserDto ud : scheduleDto.getUsers()) {
                User user = userRepository.findById(ud.getId())
                        .orElseThrow(() -> new NotFoundException("User not found with id: " + ud.getId()));
                attendees.add(user);
                user.getSchedules().add(schedule); // maintain inverse side
            }
            schedule.setUsers(attendees);
        }

        // Save and return
        Schedule savedSchedule = scheduleRepository.save(schedule);
        ScheduleDto savedDto = savedSchedule.toDto(mapper);

        if (savedSchedule.getImageData() != null) {
            savedDto.setImageBase64(Base64.getEncoder().encodeToString(savedSchedule.getImageData()));
        }

        return savedDto;
    }


    // Get all schedules
    @Override
    public List<ScheduleDto> getAllSchedules() {
        List<Schedule> schedules = scheduleRepository.findAll();
        return schedules.stream()
                .map(schedule -> schedule.toDto(mapper))
                .collect(Collectors.toList());
    }



    // Get schedule by id
    @Override
    public ScheduleDto getScheduleById(Long id) {
        Optional<Schedule> schedule = scheduleRepository.findById(id);
        if (schedule.isPresent()) {
            return schedule.get().toDto(mapper);
        } else {
            throw new NotFoundException("Schedule not found by this ID");
        }
    }

    // Update schedule by id
    @Override
    public ScheduleDto updateSchedule(Long id, ScheduleDto scheduleDto) {
        Schedule schedule = scheduleDto.toEntity(mapper);
        schedule.setScheduleId(id);


        // Check if the room is provided in the DTO and set it
        if (scheduleDto.getRoom() != null && scheduleDto.getRoom().getId() != null) {
            Room room = roomRepository.findById(scheduleDto.getRoom().getId())
                    .orElseThrow(() -> new NotFoundException("Room not found with id: " + scheduleDto.getRoom().getId()));
            schedule.setRoom(room); // Set the room in the schedule
        }

        //  Set Professor
        if (scheduleDto.getProfessor() != null && scheduleDto.getProfessor().getId() != null) {
            Professor professor = professorRepository.findById(scheduleDto.getProfessor().getId())
                    .orElseThrow(() -> new NotFoundException("Professor not found with id: " + scheduleDto.getProfessor().getId()));
            schedule.setProfessor(professor);
        }

        // set Course
        if (scheduleDto.getCourse() != null && scheduleDto.getCourse().getCourseId() != null) {
            Course course = courseRepository.findById(scheduleDto.getCourse().getCourseId())
                    .orElseThrow(() -> new NotFoundException("Course not found with id: " + scheduleDto.getProfessor().getId()));
            schedule.setCourse(course);
        }
        //set schedule and user many to many
        if (scheduleDto.getUsers() != null && !scheduleDto.getUsers().isEmpty()) {
            List<User> attendees = new ArrayList<>();
            for (UserDto ud : scheduleDto.getUsers()) {
                if (ud.getId() == null) {
                    throw new IllegalArgumentException("User ID is required to enroll in schedule.");
                }
                // fetch the existing User
                User user = userRepository.findById(ud.getId())
                        .orElseThrow(() -> new NotFoundException("User not found with id: " + ud.getId()));
                attendees.add(user);

                // maintain inverse side
                user.getSchedules().add(schedule);
            }
            schedule.setUsers(attendees);
        }



        Schedule savedSchedule = scheduleRepository.save(schedule);
        return savedSchedule.toDto(mapper);
    }

    // Delete schedule
    @Override
    public Boolean deleteSchedule(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Schedule not found with id: " + id));

        // Remove schedule from all users
        for (User user : schedule.getUsers()) {
            user.getSchedules().remove(schedule);
            userRepository.save(user); // 💡 Save the user to persist the change
        }

        // Clear the schedule's user list
        schedule.getUsers().clear();

        // Delete the schedule
        scheduleRepository.delete(schedule);

        return true;
    }

    @Override
    public byte[] generateSchedulePdfReport() {
        List<Schedule> schedules = scheduleRepository.findAll();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

            document.add(new Paragraph("Schedule Report", titleFont));
            document.add(new Paragraph("Generated on: " + new Date().toString()));
            document.add(Chunk.NEWLINE);

            for (Schedule schedule : schedules) {
                document.add(new Paragraph("Lecture Title: " + schedule.getLectureTitle(), normalFont));
                document.add(new Paragraph("Module Code: " + schedule.getModuleCode(), normalFont));
                document.add(new Paragraph("Professor: " + schedule.getProfessorName(), normalFont));
                document.add(new Paragraph("Room Number: " + schedule.getRoomNumber(), normalFont));
                document.add(new Paragraph("Capacity: " + schedule.getCapacity(), normalFont));
                document.add(new Paragraph("Start Date: " + schedule.getStartDate(), normalFont));
                document.add(new Paragraph("Start Time: " + schedule.getStartTime(), normalFont));
                document.add(new Paragraph("End Time: " + schedule.getEndTime(), normalFont));
                document.add(new Paragraph("Description: " + schedule.getScheduleDescription(), normalFont));

                if (schedule.getCourse() != null) {
                    document.add(new Paragraph("Course: " + schedule.getCourse().getName(), normalFont));
                }

                if (schedule.getRoom() != null) {
                    document.add(new Paragraph("Room Type: " + schedule.getRoom().getRoomType(), normalFont));
                }

                // Optional image
                if (schedule.getImageData() != null) {
                    Image img = Image.getInstance(schedule.getImageData());
                    img.scaleToFit(100, 100);
                    document.add(img);
                }

                document.add(new Paragraph("--------------------------------------------------"));
                document.add(Chunk.NEWLINE);
            }

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }


}
