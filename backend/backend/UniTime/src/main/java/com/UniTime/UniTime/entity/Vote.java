package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.ProfessorDto;
import com.UniTime.UniTime.dto.VoteDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.apache.catalina.LifecycleState;
import org.modelmapper.ModelMapper;

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

    @Column(name = "start_date", length = 10)
    private String start_date; // Format: YYYY-MM-DD

    @Column(name = "end_date", length = 10)
    private String end_date;

    @Column(name = "start_time", length = 8)
    private String start_time; // Format: HH:mm:ss

    @Column(name = "end_time", length = 8)
    private String end_time;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "vote", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Professor> professors = new ArrayList<>();


    public VoteDto toDto(ModelMapper mapper) {
        VoteDto voteDto = mapper.map(this, VoteDto.class);
        return voteDto;
    }


}
