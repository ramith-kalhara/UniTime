package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.AIScheduleDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "AISchedule")
public class AISchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    private Long courseId;
    private Long professorId;
    private Long roomId;
    private String timeSlot;

    @ManyToMany
    @JoinTable(
            name = "ai_schedule_users",
            joinColumns = @JoinColumn(name = "ai_schedule_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonManagedReference
    private List<User> users = new ArrayList<>();




    public AISchedule(Long courseId, Long professorId, Long roomId, String timeSlot) {
        this.courseId = courseId;
        this.professorId = professorId;
        this.roomId = roomId;
        this.timeSlot = timeSlot;

    }

    public AIScheduleDto toDto(ModelMapper mapper) {
        AIScheduleDto dto = mapper.map(this, AIScheduleDto.class);
        return dto;
    }



}
