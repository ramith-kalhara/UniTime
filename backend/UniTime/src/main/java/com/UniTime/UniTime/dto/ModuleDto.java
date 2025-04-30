package com.UniTime.UniTime.dto;

import com.UniTime.UniTime.entity.Module; // Ensure this import is present
import lombok.Data;
import org.modelmapper.ModelMapper;

@Data
public class ModuleDto {
    private Long moduleId;
    private String moduleName;

    // Method to convert ModuleDto to Module entity
    public Module toEntity(ModelMapper mapper) {
        Module module = mapper.map(this, Module.class);
        return module;
    }
}
