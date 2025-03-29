package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.ScheduleDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;
import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id", updatable = false, nullable = false)
    private Long scheduleId;

    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @Column(name = "professor_name", nullable = false)
    private String professorName;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name = "module_code", nullable = false)
    private String moduleCode;

    @Column(name = "lecture_title", nullable = false)
    private String lectureTitle;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(name = "schedule_description", columnDefinition = "TEXT")
    private String scheduleDescription;

    public ScheduleDto toDto(ModelMapper mapper) {
        ScheduleDto scheduleDto = mapper.map(this, ScheduleDto.class);
        return scheduleDto;
    }
}
