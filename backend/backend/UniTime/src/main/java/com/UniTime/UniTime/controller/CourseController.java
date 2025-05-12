package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.service.impl.CourseServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/course")
@RequiredArgsConstructor
@CrossOrigin
public class CourseController {

    private final CourseServiceImpl courseService;

    // Create Course
    @PostMapping(value = "/create", consumes = {"multipart/form-data"})
    public ResponseEntity<CourseDto> postCourse(
            @RequestPart("course") CourseDto courseDto,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            CourseDto savedCourse = courseService.postCourse(courseDto, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Get all courses
    @GetMapping("/")
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        return ResponseEntity.status(HttpStatus.OK).body(courseService.getAllCourses());
    }

    // Get course by id
    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(courseService.getCourseById(id));
    }

    // Update course by id
    @PutMapping("/{id}")
    public ResponseEntity<CourseDto> updateCourse(@PathVariable Long id, @RequestBody CourseDto courseDto) {
        return ResponseEntity.status(HttpStatus.OK).body(courseService.updateCourse(id, courseDto));
    }

    // Delete course by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteCourse(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(courseService.deleteCourse(id));
    }

    @GetMapping("/courseReportAll")
    public ResponseEntity<byte[]> getCourseReport() {
        byte[] pdf = courseService.generateCoursePdfReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename("course_report.pdf")
                .build());

        return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
    }

}
