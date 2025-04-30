package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.service.impl.CourseServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/course")
@RequiredArgsConstructor
@CrossOrigin
public class CourseController {

    private final CourseServiceImpl courseService;

    // Create Course
    @PostMapping("/create")
    public ResponseEntity<CourseDto> postCourse(@RequestBody CourseDto courseDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.postCourse(courseDto));
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
}
