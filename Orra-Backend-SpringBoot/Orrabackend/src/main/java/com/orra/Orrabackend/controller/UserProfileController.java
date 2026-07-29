package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.UserProfile.UpdateUserProfileRequestDTO;
import com.orra.Orrabackend.dto.UserProfile.UserProfileResponseDTO;
import com.orra.Orrabackend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @GetMapping
    public UserProfileResponseDTO getProfile(Authentication authentication) {

        if (authentication == null || authentication.getPrincipal() == null) {
            throw new RuntimeException("User not logged in");
        }

        Long userId = (Long) authentication.getPrincipal();
        return userProfileService.getProfile(userId);
    }

    @PutMapping
    public UserProfileResponseDTO updateProfile(
            @RequestBody UpdateUserProfileRequestDTO dto,
            Authentication authentication) {

        if (authentication == null || authentication.getPrincipal() == null) {
            throw new RuntimeException("User not logged in");
        }

        Long userId = (Long) authentication.getPrincipal();
        return userProfileService.updateProfile(userId, dto);
    }
}