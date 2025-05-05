package com.UniTime.UniTime.entity;
import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.ScheduleDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "professor")
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
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
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    @JsonBackReference
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    @JsonBackReference
    private Vote vote;

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<UserVote> userVote = new ArrayList<>();

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Schedule> schedules = new ArrayList<>();



    public ProfessorDto toDto(ModelMapper mapper) {
        ProfessorDto dto = mapper.map(this, ProfessorDto.class);

        List<ScheduleDto> scheduleDtos = this.schedules != null ?
                this.schedules.stream()
                        .map(schedule -> mapper.map(schedule, ScheduleDto.class))
                        .collect(Collectors.toList())
                : new ArrayList<>();

        dto.setSchedules(scheduleDtos);
        return dto;
    }


}
