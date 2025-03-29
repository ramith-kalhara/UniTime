package com.UniTime.UniTime.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class VoteDto {

    private Long id;
    private String start_date;
    private String end_date;
    private String start_time;
    private String end_time;
    private String description;
    private String module_id;
    private String professor_id;


}
