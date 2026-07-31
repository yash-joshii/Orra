package com.orra.Orrabackend.service.admin;

import com.orra.Orrabackend.dto.admin.AdminUserDTO;
import com.orra.Orrabackend.enums.UserRole;
import com.orra.Orrabackend.exception.ResourceNotFoundException;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.BookingRepository;
import com.orra.Orrabackend.repository.ProductListRepository;
import com.orra.Orrabackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.ZoneOffset;

@Service

@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;
    private final ProductListRepository listingRepository;
    private final BookingRepository bookingRepository;

    public Page<AdminUserDTO> getUsers(UserRole role, String status, Pageable pageable) {
        return userRepository.findAllFiltered(role, status, pageable)
                .map(this::toDTO);
    }

    public void verifyUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setVerified(true);
//        user.setStatus("ACTIVE");
        userRepository.save(user);
    }

    public void blockUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setStatus("BLOCKED");
        userRepository.save(user);
    }

    public void unblockUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setStatus("ACTIVE");
        userRepository.save(user);
    }

    private AdminUserDTO toDTO(User user) {
        long listings = listingRepository.countByOwnerId(user.getId());
        long rentals = bookingRepository.countByRenterId(user.getId());

        AdminUserDTO dto = new AdminUserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRoles(user.getRoles().stream().map(Enum::name).toList());
        dto.setStatus(user.getStatus());
        dto.setVerified(user.isVerified());
        dto.setJoinedDate(user.getCreatedAt());
        dto.setListingsCount(listings);
        dto.setRentalsCount(rentals);
        return dto;
    }
}
