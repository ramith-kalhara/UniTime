package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.UserDto;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String tpNum;
    private String password;
    private String bookRoomId;
    private String courseId;
    private String email;
    private String moduleId;

    @ManyToMany
    @JoinTable(
            name = "user_schedule",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "schedule_id")
    )
    private Set<Schedule> schedules = new HashSet<>();

    public UserDto toDto(ModelMapper mapper) {
        return mapper.map(this, UserDto.class);
    }
}
