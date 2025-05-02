package com.UniTime.UniTime.dto;

import lombok.Data;

import java.util.List;

@Data
public class VoteDto {
    private Long id;
    private String start_date;
    private String end_date;
    private String start_time;
    private String end_time;
    private String description;
    private String course_id;

    // List of professors for the vote
    private List<Long> professorIds;
}
