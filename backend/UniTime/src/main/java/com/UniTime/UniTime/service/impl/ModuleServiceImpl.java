package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.ModuleDto;
import com.UniTime.UniTime.entity.Module;
import com.UniTime.UniTime.exception.NotFoundException;
import com.UniTime.UniTime.repository.ModuleRepository;
import com.UniTime.UniTime.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository moduleRepository;
    private final ModelMapper mapper;

    // Create module
    @Override
    public ModuleDto postModule(ModuleDto moduleDto) {
        // Convert DTO to Entity
        Module module = mapper.map(moduleDto, Module.class);

        // Save Entity
        Module savedModule = moduleRepository.save(module);

        // Convert back to DTO and return
        return mapper.map(savedModule, ModuleDto.class);
    }

    // Get all modules
    @Override
    public List<ModuleDto> getAllModules() {
        List<Module> moduleRepositoryAll = moduleRepository.findAll();
        if (moduleRepositoryAll.isEmpty()) {
            return new ArrayList<>();
        } else {
            return moduleRepositoryAll.stream()
                    .map(module -> mapper.map(module, ModuleDto.class))
                    .toList();
        }
    }

    // Get module by id
    @Override
    public ModuleDto getModuleById(Long id) {
        Optional<Module> module = moduleRepository.findById(id);
        if (module.isPresent()) {
            return mapper.map(module.get(), ModuleDto.class);
        } else {
            throw new NotFoundException("Module not found by this Id");
        }
    }

    // Update module by id
    @Override
    public ModuleDto updateModule(Long id, ModuleDto moduleDto) {
        Module module = mapper.map(moduleDto, Module.class);
        module.setModuleId(id);
        Module savedModule = moduleRepository.save(module);
        return mapper.map(savedModule, ModuleDto.class);
    }

    // Delete module
    @Override
    public Boolean deleteModule(Long id) {
        moduleRepository.deleteById(id);
        return true;
    }
}

