package com.finance.backend.config;

import com.finance.backend.entity.Student;
import com.finance.backend.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class StudentDataSeeder {

    @Bean
    public CommandLineRunner initStudentData(StudentRepository studentRepository) {
        return args -> {
            if (studentRepository.count() == 0) {
                Student s1 = Student.builder()
                        .name("Alice Smith")
                        .email("alice.smith@example.com")
                        .course("Computer Science")
                        .build();

                Student s2 = Student.builder()
                        .name("Bob Jones")
                        .email("bob.jones@example.com")
                        .course("Finance")
                        .build();

                studentRepository.saveAll(List.of(s1, s2));
                System.out.println("Default student details have been added.");
            }
        };
    }
}
