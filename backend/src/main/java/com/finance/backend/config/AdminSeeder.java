package com.finance.backend.config;

import com.finance.backend.entity.Role;
import com.finance.backend.entity.User;
import com.finance.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("admin@finance.com")) {
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@finance.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println("Admin user created: admin@finance.com / admin123");
        }

        // Add 5 mock member details
        String[] memberNames = {"Alice Smith", "Bob Johnson", "Charlie Davis", "Diana Prince", "Evan Wright"};
        for (int i = 0; i < memberNames.length; i++) {
            String email = "member" + (i + 1) + "@finance.com";
            if (!userRepository.existsByEmail(email)) {
                User member = User.builder()
                        .name(memberNames[i])
                        .email(email)
                        .password(passwordEncoder.encode("password123"))
                        .role(Role.USER)
                        .build();
                userRepository.save(member);
                System.out.println("Member user created: " + email + " / password123");
            }
        }
    }
}
