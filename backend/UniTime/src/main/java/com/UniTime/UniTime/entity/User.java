package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "firstName", nullable = false, length = 100)
    private String firstName;

    @Column(name = "lastName", nullable = false, length = 100)
    private String lastName;

    @Column(name = "tpNum", nullable = false)
    private String tpNum;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "bookRoomId", nullable = false)
    private String bookRoomId;

    @Column(name = "courseId", nullable = false)
    private String courseId;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "moduleId", nullable = false)
    private String moduleId;

    // Convert the User Entity to UserDto
    public UserDto toDto(ModelMapper mapper) {
        return mapper.map(this, UserDto.class);
    }
}
