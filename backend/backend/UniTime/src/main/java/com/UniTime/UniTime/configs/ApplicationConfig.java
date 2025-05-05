package com.UniTime.UniTime.configs;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.Vote;
import com.UniTime.UniTime.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final CourseRepository courseRepository; // if you want to access repositories (optional)

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

//        // Custom mapping to avoid circular references
//        modelMapper.addMappings(new PropertyMap<Professor, ProfessorDto>() {
//            @Override
//            protected void configure() {
//                // Skip the course field to avoid circular reference
//                skip(destination.getCourse());
//            }
//        });
//
        modelMapper.addMappings(new PropertyMap<Course, CourseDto>() {
            @Override
            protected void configure() {
                // Skip the professors field to avoid circular reference
                skip(destination.getProfessors());
            }
        });

        modelMapper.addMappings(new PropertyMap<Vote, VoteDto>() {
            @Override
            protected void configure() {
                // Skip the professors field to avoid circular reference
                skip(destination.getProfessors());
            }
        });

        return modelMapper;
    }
}

