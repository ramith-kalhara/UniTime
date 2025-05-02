package com.UniTime.UniTime.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class VoteDto {
    private Long id;
    private String start_date;
    private String end_date;
    private String start_time;
    private String end_time;
    private String description;
    private String course_id;

    private List<Long> professorIds;
    private Set<Long> userIds = new HashSet<>();
}
