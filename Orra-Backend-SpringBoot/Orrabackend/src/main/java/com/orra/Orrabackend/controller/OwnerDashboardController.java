package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.OwnerDashboard.OwnerDashboardResponseDTO;
import com.orra.Orrabackend.service.OwnerDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.orra.Orrabackend.dto.OwnerDashboard.OwnerActiveListingDTO;
import com.orra.Orrabackend.dto.OwnerDashboard.OwnerEarningDetailsDTO;
import com.orra.Orrabackend.dto.OwnerDashboard.OwnerCompletedRentalDTO;
import java.util.List;


@RestController
@RequestMapping("/owner/dashboard")
public class OwnerDashboardController {

    @Autowired
    private OwnerDashboardService ownerDashboardService;

    @GetMapping
    public OwnerDashboardResponseDTO getDashboard(Authentication authentication) {

        Long ownerId = (Long) authentication.getPrincipal();

        return ownerDashboardService.getDashboard(ownerId);
    }

    @GetMapping("/earnings")
    public List<OwnerEarningDetailsDTO> getEarningDetails(
            Authentication authentication) {

        Long ownerId = (Long) authentication.getPrincipal();

        return ownerDashboardService.getEarningDetails(ownerId);
    }

    @GetMapping("/active-listings")
    public List<OwnerActiveListingDTO> getActiveListings(
            Authentication authentication) {

        Long ownerId = (Long) authentication.getPrincipal();

        return ownerDashboardService.getActiveListings(ownerId);
    }

    @GetMapping("/completed-rentals")
    public List<OwnerCompletedRentalDTO> getCompletedRentals(
            Authentication authentication) {

        Long ownerId = (Long) authentication.getPrincipal();

        return ownerDashboardService.getCompletedRentals(ownerId);
    }
}