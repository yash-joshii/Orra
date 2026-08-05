package com.orra.Orrabackend.service;

import com.orra.Orrabackend.dto.UserProfile.UpdateUserProfileRequestDTO;
import com.orra.Orrabackend.dto.UserProfile.UserProfileResponseDTO;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class UserProfileService {

    @Autowired
    private UserRepository userRepository;

    private static final String UPLOAD_DIR = "uploads/avatars/";

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
                user.getAvatar(),
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

    public UserProfileResponseDTO updateAvatar(Long userId, MultipartFile file) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = UUID.randomUUID() + extension;

            Path targetPath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            user.setAvatar("/uploads/avatars/" + filename);
            userRepository.save(user);

        } catch (IOException e) {
            throw new RuntimeException("Failed to store avatar file: " + e.getMessage(), e);
        }

        return getProfile(user.getId());
    }
}