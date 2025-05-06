package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.dto.UserDto;
import com.UniTime.UniTime.dto.UserVoteDto;
import com.UniTime.UniTime.entity.*;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.*;
import com.UniTime.UniTime.service.UserService;
import com.UniTime.UniTime.service.UserVoteService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserVoteRepository userVoteRepository;
    private final ProfessorRepository  professorRepository;
    private final VoteRepository voteRepository;
    private final CourseRepository courseRepository;
    private final ScheduleRepository scheduleRepository;
    private final ModelMapper mapper;

    //create user
    @Override
    public UserDto postUser(UserDto userDto) {
        //  Map the User (no save yet)
        User user = mapper.map(userDto, User.class);

        //  Build the UserVote list before saving
        if (userDto.getUserVotes() != null && !userDto.getUserVotes().isEmpty()) {
            List<UserVote> uvs = new ArrayList<>();
            System.out.println("User Votes " + userDto.getUserVotes());
            for (UserVoteDto uvDto : userDto.getUserVotes()) {
                // Create fresh UserVote
                UserVote uv = new UserVote();

                // Associate Professor if provided
                if (uvDto.getProfessor() != null && uvDto.getProfessor().getId() != null) {
                    Professor prof = professorRepository.findById(uvDto.getProfessor().getId())
                            .orElseThrow(() -> new NotFoundException("Professor not found"));
                    uv.setProfessor(prof);
                }

                // Associate Vote (master) if provided
                if (uvDto.getVote() != null && uvDto.getVote().getId() != null) {
                    Vote vote = voteRepository.findById(uvDto.getVote().getId())
                            .orElseThrow(() -> new NotFoundException("Vote not found"));
                    uv.setVote(vote);
                }

                //many to many user and course
                if (userDto.getCourses() != null && !userDto.getCourses().isEmpty()) {
                    List<Course> courses = new ArrayList<>();
                    for (CourseDto cd : userDto.getCourses()) {
                        if (cd.getCourseId() == null) {
                            throw new IllegalArgumentException("Course ID is required to enroll user.");
                        }
                        Course course = courseRepository.findById(cd.getCourseId())
                                .orElseThrow(() -> new NotFoundException("Course not found with id: " + cd.getCourseId()));
                        courses.add(course);

                        // maintain inverse side (optional, but keeps the in-memory model consistent)
                        course.getUsers().add(user);
                    }
                    user.setCourses(courses);
                }

                if (userDto.getSchedules() != null && !userDto.getSchedules().isEmpty()) {
                    List<Schedule> schedules = new ArrayList<>();
                    for (ScheduleDto sd : userDto.getSchedules()) {
                        if (sd.getScheduleId() == null) {
                            throw new IllegalArgumentException("Schedule ID is required to enroll user.");
                        }
                        Schedule schedule = scheduleRepository.findById(sd.getScheduleId())
                                .orElseThrow(() -> new NotFoundException("Schedule not found with id: " + sd.getScheduleId()));
                        schedules.add(schedule);

                        // maintain inverse side (optional, but keeps the in-memory model consistent)
                        schedule.getUsers().add(user);
                    }
                    user.setSchedules(schedules);
                }

                // Link back to the new User
                uv.setUser(user);

                uvs.add(uv);
            }
            user.setUserVotes(uvs);
        }

        //  Now save the User (cascades to userVotes)
        User saved = userRepository.save(user);

        //  Return the DTO
        return saved.toDto(mapper);
    }




    //get all users
    @Override
    public List<UserDto> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        if (allUsers.isEmpty()) {
            return new ArrayList<>();
        } else {
            return allUsers.stream().map(user -> mapper.map(user, UserDto.class)).toList();
        }
    }

    //get user by id
    @Override
    public UserDto getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return mapper.map(user.get(), UserDto.class);
        } else {
            throw new NotFoundException("User not found by this ID");
        }
    }

    //update user by id
    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = mapper.map(userDto, User.class);
        user.setId(id);
        User savedUser = userRepository.save(user);
        return mapper.map(savedUser, UserDto.class);
    }

    //delete user
    @Override
    public Boolean deleteUser(Long id) {
        userRepository.deleteById(id);
        return true;
    }

    @Override
    public UserDto login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(password)) {
                return mapper.map(user, UserDto.class);
            } else {
                throw new RuntimeException("Invalid password");
            }
        } else {
            throw new NotFoundException("User not found with email: " + email);
        }
    }

}
