package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.UserProfile.UpdateUserProfileRequestDTO;
import com.orra.Orrabackend.dto.UserProfile.UserProfileResponseDTO;
import com.orra.Orrabackend.service.UserProfileService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @GetMapping
    public UserProfileResponseDTO getProfile(HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }

        return userProfileService.getProfile(userId);
    }

    @PutMapping
    public UserProfileResponseDTO updateProfile(
            @RequestBody UpdateUserProfileRequestDTO dto,
            HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }

        return userProfileService.updateProfile(userId, dto);
    }

}