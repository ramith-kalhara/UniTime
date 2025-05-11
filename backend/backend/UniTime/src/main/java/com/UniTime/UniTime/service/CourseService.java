package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.CourseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CourseService {

    // Method to create a new course
    public CourseDto postCourse(CourseDto courseDto, MultipartFile image) throws IOException;

    // Method to get all courses
    public List<CourseDto> getAllCourses();

    // Method to get a course by its ID
    public CourseDto getCourseById(Long id);

    // Method to update an existing course
    public CourseDto updateCourse(Long id, CourseDto courseDto);

    // Method to delete a course by its ID
    public Boolean deleteCourse(Long id);

    byte[] generateCoursePdfReport();
}

