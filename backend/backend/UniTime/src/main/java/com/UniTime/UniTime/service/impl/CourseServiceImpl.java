package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.dto.UserDto;
import com.UniTime.UniTime.entity.*;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.CourseRepository;
import com.UniTime.UniTime.repository.ScheduleRepository;
import com.UniTime.UniTime.repository.UserRepository;
import com.UniTime.UniTime.service.CourseService;
import jakarta.transaction.Transactional;
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

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    // Create course
    @Override
    public CourseDto postCourse(CourseDto courseDto, MultipartFile image) throws IOException {
        // Convert DTO to Entity
        Course course = courseDto.toEntity(mapper);

        // Handle Image Upload
        if (image != null && !image.isEmpty()) {
            course.setImageData(image.getBytes());
        }

        // Handle Schedules
        List<Schedule> schedules = new ArrayList<>();
        if (courseDto.getSchedules() != null) {
            for (ScheduleDto scheduleDto : courseDto.getSchedules()) {
                scheduleDto.setScheduleId(null); // Ensure new schedules

                Schedule schedule = mapper.map(scheduleDto, Schedule.class);
                schedule.setCourse(course); // Link schedule to course
                schedules.add(schedule);
            }
        }
        course.setSchedules(schedules); // set to course before saving

        // Handle Many-to-Many Users
        if (courseDto.getUsers() != null && !courseDto.getUsers().isEmpty()) {
            List<User> users = new ArrayList<>();
            for (UserDto userDto : courseDto.getUsers()) {
                if (userDto.getId() == null) {
                    throw new IllegalArgumentException("User ID is required.");
                }

                User user = userRepository.findById(userDto.getId())
                        .orElseThrow(() -> new NotFoundException("User not found with id: " + userDto.getId()));
                users.add(user);
                user.getCourses().add(course); // maintain inverse (optional)
            }
            course.setUsers(users);
        }

        // Handle Vote (One-to-One)
        if (courseDto.getVote() != null) {
            Vote vote = courseDto.getVote().toEntity(mapper);
            vote.setCourse(course);  // bidirectional link
            course.setVote(vote);
        }

        // Save Course (schedules and vote saved via cascade)
        Course savedCourse = courseRepository.save(course);

        // Convert to DTO and attach Base64 image
        CourseDto savedDto = savedCourse.toDto(mapper);
        if (savedCourse.getImageData() != null) {
            savedDto.setImageBase64(Base64.getEncoder().encodeToString(savedCourse.getImageData()));
        }

        return savedDto;
    }




    // Get all courses
    @Override
    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(course -> {
                    CourseDto dto = course.toDto(mapper);
                    if (course.getImageData() != null) {
                        dto.setImageBase64(Base64.getEncoder().encodeToString(course.getImageData()));
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }


    // Get course by id
    @Override
    public CourseDto getCourseById(Long id) {
        Optional<Course> course = courseRepository.findById(id);
        if (course.isPresent()) {
            return course.get().toDto(mapper);
        } else {
            throw new NotFoundException("Course not found by this Id");
        }
    }

    // Update course by id
    @Override
    public CourseDto updateCourse(Long id, CourseDto courseDto) {
        Course course = mapper.map(courseDto, Course.class);
        course.setCourseId(id);

        // Handle new schedules before saving the course
        List<Schedule> schedules = new ArrayList<>();
        if (courseDto.getSchedules() != null) {
            for (ScheduleDto scheduleDto : courseDto.getSchedules()) {
                // Ensure scheduleId is null for new schedules
                scheduleDto.setScheduleId(null);  // Explicitly set to null before mapping to the entity

                // If scheduleDto contains an ID, it's an existing schedule, not allowed for a new course
                if (scheduleDto.getScheduleId() != null) {
                    throw new IllegalArgumentException("Cannot attach an existing schedule to a new course.");
                }

                // Create a new schedule from DTO
                Schedule schedule = mapper.map(scheduleDto, Schedule.class);
                schedule.setCourse(course); // Link the schedule to the course
                schedules.add(schedule);
            }
        }

        //  Handle many-to-many Users
        if (courseDto.getUsers() != null && !courseDto.getUsers().isEmpty()) {
            List<User> users = new ArrayList<>();
            for (UserDto ud : courseDto.getUsers()) {
                if (ud.getId() == null) {
                    throw new IllegalArgumentException("User ID is required to enroll in course.");
                }
                User user = userRepository.findById(ud.getId())
                        .orElseThrow(() -> new NotFoundException("User not found with id: " + ud.getId()));
                users.add(user);
                // maintain the inverse side (optional)
                user.getCourses().add(course);
            }
            course.setUsers(users);
        }

        // Set the schedules on the course (cascade will handle saving them)
        course.setSchedules(schedules);

        if (courseDto.getVote() != null) {
            Vote vote = courseDto.getVote().toEntity(mapper);
            course.setVote(vote);
            vote.setCourse(course);
        }
        Course savedCourse = courseRepository.save(course);
        return savedCourse.toDto(mapper);
    }

    // Delete course
    @Transactional
    @Override
    public Boolean deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Course not found with id: " + id));

        // Remove course from all associated schedules
        for (Schedule schedule : course.getSchedules()) {
            schedule.setCourse(null);  // Remove reference to course
        }
        course.getSchedules().clear();

        // Remove course from users' course list (many-to-many relationship)
        for (User user : course.getUsers()) {
            user.getCourses().remove(course); // Remove course reference from user
        }
        course.getUsers().clear();

        // Remove course from associated vote (if present)
        if (course.getVote() != null) {
            Vote vote = course.getVote();
            vote.setCourse(null); // Remove the course reference from vote
        }

        // Now safely delete the course
        courseRepository.delete(course);
        return true;
    }

    @Override
    public byte[] generateCoursePdfReport() {
        List<Course> courses = courseRepository.findAll();

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);

            document.add(new Paragraph("Course Report", titleFont));
            document.add(new Paragraph("Generated on: " + new Date().toString()));
            document.add(Chunk.NEWLINE);

            for (Course course : courses) {
                document.add(new Paragraph("Course Name: " + course.getName(), normalFont));
                document.add(new Paragraph("Course Code: " + course.getCourseCode(), normalFont));
                document.add(new Paragraph("Credits: " + course.getCredits(), normalFont));
                document.add(new Paragraph("Department: " + course.getDepartment(), normalFont));
                document.add(new Paragraph("Start Date: " + course.getStartDate(), normalFont));
                document.add(new Paragraph("Description: " + course.getDescription(), normalFont));

                // Include associated professors
                if (course.getProfessors() != null && !course.getProfessors().isEmpty()) {
                    document.add(new Paragraph("Professors:", normalFont));
                    for (Professor professor : course.getProfessors()) {
                        document.add(new Paragraph("   - " + professor.getFull_name(), normalFont));
                    }
                }

                // Include associated schedules
                if (course.getSchedules() != null && !course.getSchedules().isEmpty()) {
                    document.add(new Paragraph("Schedules:", normalFont));
                    for (Schedule schedule : course.getSchedules()) {
                        document.add(new Paragraph("   - " + schedule.getLectureTitle(), normalFont));
                    }
                }

                // Optional image
                if (course.getImageData() != null) {
                    Image img = Image.getInstance(course.getImageData());
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
