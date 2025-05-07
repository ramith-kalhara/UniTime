package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.CourseDto;
import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.apache.catalina.LifecycleState;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "votes") // Naming the table explicitly
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false)
    private Long id;

    @Column(name = "start_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "vote", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
    private List<Professor> professors = new ArrayList<>();

    // Add the relationship with Course
    @OneToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "vote", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<UserVote> userVotes = new ArrayList<>();



    public VoteDto toDto(ModelMapper mapper) {
        VoteDto voteDto = mapper.map(this, VoteDto.class);


        if (this.course != null) {
            CourseDto courseDto = this.course.toDto(mapper); // ensure this method maps all fields
            voteDto.setCourse(courseDto);
        }
        return voteDto;
    }


}
