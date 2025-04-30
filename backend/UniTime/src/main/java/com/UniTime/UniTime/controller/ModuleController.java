package com.UniTime.UniTime.controller;

import com.UniTime.UniTime.dto.ModuleDto;
import com.UniTime.UniTime.service.impl.ModuleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/module")
@RequiredArgsConstructor
@CrossOrigin
public class ModuleController {

    private final ModuleServiceImpl moduleService;

    // Create Module
    @PostMapping("/create")
    public ResponseEntity<ModuleDto> postModule(@RequestBody ModuleDto moduleDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(moduleService.postModule(moduleDto));
    }

    // Get all modules
    @GetMapping("/")
    public ResponseEntity<List<ModuleDto>> getAllModules() {
        return ResponseEntity.status(HttpStatus.OK).body(moduleService.getAllModules());
    }

    // Get module by id
    @GetMapping("/{id}")
    public ResponseEntity<ModuleDto> getModuleById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(moduleService.getModuleById(id));
    }

    // Update module by id
    @PutMapping("/{id}")
    public ResponseEntity<ModuleDto> updateModule(@PathVariable Long id, @RequestBody ModuleDto moduleDto) {
        return ResponseEntity.status(HttpStatus.OK).body(moduleService.updateModule(id, moduleDto));
    }

    // Delete module by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteModule(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(moduleService.deleteModule(id));
    }
}

