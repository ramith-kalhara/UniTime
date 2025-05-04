package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Room;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.repository.ProfessorRepository;
import com.UniTime.UniTime.repository.RoomRepository;
import com.UniTime.UniTime.repository.CourseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    private final ProfessorRepository professorRepository;
    private final CourseRepository courseRepository;
    private final RoomRepository roomRepository;

    private final String UPLOAD_DIR = "uploads/";

    public FileUploadController(
            ProfessorRepository professorRepository,
            CourseRepository courseRepository,
            RoomRepository roomRepository
    ) {
        this.professorRepository = professorRepository;
        this.courseRepository = courseRepository;
        this.roomRepository = roomRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("id") Long entityId,
            @RequestParam("type") String type
    ) {
        try {
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String imagePath = "/uploads/" + filename;

            switch (type.toLowerCase()) {
                case "professor":
                    Professor professor = professorRepository.findById(entityId)
                            .orElseThrow(() -> new RuntimeException("Professor not found"));
                    professor.setImagePath(imagePath);
                    professorRepository.save(professor);
                    break;

                case "course":
                    Course course = courseRepository.findById(entityId)
                            .orElseThrow(() -> new RuntimeException("Course not found"));
                    course.setImagePath(imagePath); // Adjust this based on your Course field name
                    courseRepository.save(course);
                    break;

                case "room":
                    Room room = roomRepository.findById(entityId)
                            .orElseThrow(() -> new RuntimeException("Room not found"));
                    room.setImagePath(imagePath); // Adjust this based on your Room field name
                    roomRepository.save(room);
                    break;

                default:
                    return ResponseEntity.badRequest().body("Invalid type. Must be professor, course, or room.");
            }

            return ResponseEntity.ok("File uploaded and image path set for " + type + ": " + imagePath);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload or database update failed");
        }
    }
}
