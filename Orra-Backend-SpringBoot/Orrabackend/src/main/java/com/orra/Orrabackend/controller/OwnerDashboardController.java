package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.OwnerDashboard.OwnerDashboardResponseDTO;
import com.orra.Orrabackend.service.OwnerDashboardService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/owner/dashboard")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class OwnerDashboardController {

    @Autowired
    private OwnerDashboardService ownerDashboardService;

    @GetMapping
    public OwnerDashboardResponseDTO getDashboard(HttpSession session) {

        Long ownerId = (Long) session.getAttribute("userId");

        if (ownerId == null) {
            throw new RuntimeException("User not logged in");
        }

        return ownerDashboardService.getDashboard(ownerId);
    }
}