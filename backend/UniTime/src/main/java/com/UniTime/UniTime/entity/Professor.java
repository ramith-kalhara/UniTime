package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "professor")
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String full_name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "tp_num", nullable = false)
    private String tp_num;

    @Column(name = "department_name", nullable = false)
    private String department_name;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "postal_code", nullable = false)
    private String postal_code;

    @ManyToMany(mappedBy = "professors")
    private Set<Course> courses = new HashSet<>();


    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    // Many-to-Many mappedBy in Vote
    @ManyToMany(mappedBy = "professors")
    private Set<Vote> votes = new HashSet<>();

    //schedule relation
    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Schedule> schedules = new HashSet<>();



    public ProfessorDto toDto(ModelMapper mapper) {
        return mapper.map(this, ProfessorDto.class);
    }
}
