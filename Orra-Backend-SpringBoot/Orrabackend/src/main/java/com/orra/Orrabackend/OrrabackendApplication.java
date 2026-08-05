package com.orra.Orrabackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class OrrabackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrrabackendApplication.class, args);
	}
}

