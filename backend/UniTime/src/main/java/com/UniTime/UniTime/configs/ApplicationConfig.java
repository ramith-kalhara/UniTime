package com.UniTime.UniTime.configs;

import com.UniTime.UniTime.dto.ScheduleDto;
import com.UniTime.UniTime.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration()
                .setSkipNullEnabled(true)
                .setFieldMatchingEnabled(true)
                .setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.typeMap(Schedule.class, ScheduleDto.class).addMappings(mapper -> {
            mapper.skip(ScheduleDto::setUsers); // skip if needed
        });

        return modelMapper;
    }



}
