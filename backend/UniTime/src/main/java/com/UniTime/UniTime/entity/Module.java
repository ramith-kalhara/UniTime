package com.UniTime.UniTime.entity;

import com.UniTime.UniTime.dto.ModuleDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.ModelMapper;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "module")
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "module_id", updatable = false, nullable = false)
    private Long moduleId;

    @Column(name = "module_name", nullable = false, length = 100)
    private String moduleName;

    // You can add more fields as per your requirements

    public ModuleDto toDto(ModelMapper mapper) {
        ModuleDto moduleDto = mapper.map(this, ModuleDto.class);
        return moduleDto;
    }
}

