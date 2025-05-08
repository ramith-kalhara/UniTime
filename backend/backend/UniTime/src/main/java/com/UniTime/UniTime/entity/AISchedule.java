package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.AIScheduleDto;
import jakarta.persistence.*;
import lombok.*;
import org.modelmapper.ModelMapper;

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
