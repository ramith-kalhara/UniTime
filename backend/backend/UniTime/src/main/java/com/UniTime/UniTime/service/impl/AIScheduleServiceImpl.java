package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.AIScheduleDto;
import com.UniTime.UniTime.dto.AIScheduleRequest;
import com.UniTime.UniTime.entity.AISchedule;
import com.UniTime.UniTime.repository.AIScheduleRepository;
import com.UniTime.UniTime.service.AIScheduleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AIScheduleServiceImpl implements AIScheduleService {

    private final ModelMapper modelMapper;

    @Autowired
    public AIScheduleRepository aiScheduleRepository;

    public AIScheduleServiceImpl(AIScheduleRepository aiScheduleRepository, ModelMapper modelMapper) {
        this.aiScheduleRepository = aiScheduleRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public AISchedule generateAndSaveAISchedule(AIScheduleRequest request) {

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:5000/predict-time-slot";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("course_id", request.getCourseId());
        body.put("professor_id", request.getProfessorId());
        body.put("room_id", request.getRoomId());

        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, httpEntity, Map.class);

        //getting time slot in python
        String timeSlot = (String) response.getBody().get("time_slot");

        AISchedule schedule = new AISchedule(
                request.getCourseId(),
                request.getProfessorId(),
                request.getRoomId(),
                timeSlot
        );
        return aiScheduleRepository.save(schedule);
    }

    @Override
    public List<AIScheduleDto> getAllAISchedules() {
        List<AISchedule> schedules = aiScheduleRepository.findAll();
        return schedules.stream()
                .map(schedule -> schedule.toDto(modelMapper))
                .collect(Collectors.toList());
    }

    @Override
    public AIScheduleDto getAIScheduleById(long id) {
        Optional<AISchedule> optionalSchedule = aiScheduleRepository.findById(id);
        return optionalSchedule.map(schedule -> schedule.toDto(modelMapper)).orElse(null);
    }

    @Override
    public Boolean deleteAIScheduleById(long id) {
        if (aiScheduleRepository.existsById(id)) {
            aiScheduleRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
