package com.UniTime.UniTime;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableScheduling
public class UniTimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(UniTimeApplication.class, args);
	}

}
