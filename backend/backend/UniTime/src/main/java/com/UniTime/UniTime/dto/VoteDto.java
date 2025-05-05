package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.User;
import com.UniTime.UniTime.entity.Vote;
import jakarta.persistence.Column;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.List;

@Data
public class VoteDto {

    private Long id;
    private String start_date;
    private String end_date;
    private String start_time;
    private String end_time;
    private String description;

    private List<ProfessorDto> professors;


    public Vote toEntity(ModelMapper mapper) {
        return mapper.map(this, Vote.class);
    }
}
