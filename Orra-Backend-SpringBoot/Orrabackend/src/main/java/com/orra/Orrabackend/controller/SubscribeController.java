package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.UserRepository;
import com.orra.Orrabackend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscribe")
public class SubscribeController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public String subscribe(Authentication authentication) {

        if (authentication == null || authentication.getPrincipal() == null) {
            throw new RuntimeException("User not logged in");
        }

        Long userId = (Long) authentication.getPrincipal();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

// Already subscribed?
        if (Boolean.TRUE.equals(user.getSubscribed())) {
            return "You are already subscribed.";
        }

// Update subscription status
        user.setSubscribed(true);

        userRepository.save(user);

// Send confirmation email
        emailService.sendSubscriptionEmail(user.getEmail());

        return "Subscription email sent successfully.";
    }
}