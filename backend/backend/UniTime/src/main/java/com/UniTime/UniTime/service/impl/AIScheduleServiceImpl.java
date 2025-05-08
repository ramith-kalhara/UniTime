package com.UniTime.UniTime.service.impl;

import com.UniTime.UniTime.dto.AIScheduleRequest;
import com.UniTime.UniTime.entity.AISchedule;
import com.UniTime.UniTime.repository.AIScheduleRepository;
import com.UniTime.UniTime.service.AIScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import java.util.HashMap;
import java.util.Map;

@Service
public class AIScheduleServiceImpl implements AIScheduleService {


    @Autowired
    public AIScheduleRepository aiScheduleRepository;

    @Override
    public AISchedule generateAndSaveAISchedule(AIScheduleRequest request) {

        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:5000/predict-time-slot";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("course_id", request.getCourseId());
        body.put("module_id", request.getModuleId());
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
}
