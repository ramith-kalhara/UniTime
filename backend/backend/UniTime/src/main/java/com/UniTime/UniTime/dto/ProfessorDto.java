package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Professor;
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
public class ProfessorDto {
    private Long id;
    private String full_name;
    private String email;
    private int tp_num;
    private String department_name;
    private String address;
    private String city;
    private String country;
    private String postal_code;
    private String module_code;
    private String module_id;
    private String description;
    private String imagePath;

    public Professor toEntity(ModelMapper mapper) {
        return mapper.map(this, Professor.class);
    }
}
