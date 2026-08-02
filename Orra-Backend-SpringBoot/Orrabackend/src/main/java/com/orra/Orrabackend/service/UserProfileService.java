package com.orra.Orrabackend.service;

import com.orra.Orrabackend.dto.UserProfile.UpdateUserProfileRequestDTO;
import com.orra.Orrabackend.dto.UserProfile.UserProfileResponseDTO;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    private UserRepository userRepository;

    public UserProfileResponseDTO getProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String fullName = user.getName();

        String firstName = "";
        String lastName = "";

        if (fullName != null && !fullName.trim().isEmpty()) {

            String[] parts = fullName.trim().split("\\s+", 2);

            firstName = parts[0];

            if (parts.length > 1) {
                lastName = parts[1];
            }
        }

        return new UserProfileResponseDTO(
                firstName,
                lastName,
                user.getEmail(),
                user.getPhone(),
                user.getRoles()
        );
    }

    public UserProfileResponseDTO updateProfile(
            Long userId,
            UpdateUserProfileRequestDTO dto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String fullName = dto.getFirstName().trim();

        if (dto.getLastName() != null && !dto.getLastName().trim().isEmpty()) {
            fullName += " " + dto.getLastName().trim();
        }

        user.setName(fullName);

        user.setEmail(dto.getEmail());

        user.setPhone(dto.getPhone());

        user.setAddress(dto.getLocation());

        userRepository.save(user);

        return getProfile(user.getId());
    }
}