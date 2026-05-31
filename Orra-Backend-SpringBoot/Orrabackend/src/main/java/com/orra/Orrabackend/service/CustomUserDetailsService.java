package com.orra.Orrabackend.service;



import com.orra.Orrabackend.Entity.User;
import com.orra.Orrabackend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

    @Service
    public class CustomUserDetailsService implements UserDetailsService {

        private static final Logger log = LoggerFactory.getLogger(CustomUserDetailsService.class);

        @Autowired
        private UserRepository userRepository;

        @Override
        public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
            log.info("==> [AUTH] loadUserByUsername called with value: '{}'", id);

            Integer userId;
            try {
                userId = Integer.parseInt(id);
                log.info("==> [AUTH] Parsed user ID: {}", userId);
            } catch (NumberFormatException e) {
                log.error("==> [AUTH] FAILED - '{}' is not a valid integer user ID", id);
                throw new UsernameNotFoundException("Invalid user ID: " + id);
            }

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> {
                        log.error("==> [AUTH] FAILED - No user found in DB with ID: {}", userId);
                        return new UsernameNotFoundException("User not found with ID: " + userId);
                    });

            log.info("==> [AUTH] User found: id={}, name={}, role={}", user.getId(), user.getName(), user.getRole());
            log.info("==> [AUTH] Stored hashed password (first 20 chars): {}", user.getPassword() != null ? user.getPassword().substring(0, Math.min(20, user.getPassword().length())) + "..." : "NULL");

            String grantedRole = "ROLE_" + user.getRole().name();
            log.info("==> [AUTH] Granting authority: '{}'", grantedRole);
            log.info("==> [AUTH] Security requires role 'ROLE_owner' for /api/admin/** — granted role is '{}'", grantedRole);

            UserDetails userDetails = org.springframework.security.core.userdetails.User
                    .withUsername(String.valueOf(user.getId()))
                    .password(user.getPassword())
                    .authorities(grantedRole)
                    .build();

            log.info("==> [AUTH] UserDetails built successfully for user ID: {}", userId);
            return userDetails;
        }
    }

