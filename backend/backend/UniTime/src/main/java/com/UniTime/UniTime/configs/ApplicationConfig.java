package com.UniTime.UniTime.configs;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.UserDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.UniTime.UniTime.entity.Course;
import com.UniTime.UniTime.entity.Professor;
import com.UniTime.UniTime.entity.User;
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

        modelMapper.addMappings(new PropertyMap<Course, CourseDto>() {
            @Override
            protected void configure() {
                // Skip the professors field to avoid circular reference
                skip(destination.getProfessors());
                skip(destination.getSchedules());
                skip(destination.getVote());
            }
        });


        modelMapper.addMappings(new PropertyMap<Vote, VoteDto>() {
            @Override
            protected void configure() {
                // Skip the professors field to avoid circular reference
//                skip(destination.getProfessors());
                skip(destination.getUserVotes());
            }
        });

        //professor -> UserVote, Schedule, Vote
        modelMapper.addMappings(new PropertyMap<Professor, ProfessorDto>() {
            @Override
            protected void configure() {
                // Skip the professors field to avoid circular reference
                skip(destination.getUserVote());
                skip(destination.getSchedules());
                skip(destination.getVote());
            }
        });

        //User -> UserVote
        modelMapper.addMappings(new PropertyMap<User, UserDto>() {
            @Override
            protected void configure() {
                // Skip the professors field to avoid circular reference
                skip(destination.getUserVotes());
                skip(destination.getCourses());

            }
        });



        return modelMapper;
    }
}

