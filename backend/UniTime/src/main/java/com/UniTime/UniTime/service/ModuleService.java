package com.UniTime.UniTime.service;

import com.UniTime.UniTime.dto.ModuleDto;

import java.util.List;

public interface ModuleService {

    // Method to create a new module
    public ModuleDto postModule(ModuleDto moduleDto);

    // Method to get all modules
    public List<ModuleDto> getAllModules();

    // Method to get a module by its ID
    public ModuleDto getModuleById(Long id);

    // Method to update an existing module
    public ModuleDto updateModule(Long id, ModuleDto moduleDto);

    // Method to delete a module by its ID
    public Boolean deleteModule(Long id);
}

