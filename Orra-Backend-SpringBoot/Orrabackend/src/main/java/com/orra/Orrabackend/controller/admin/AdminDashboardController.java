package com.orra.Orrabackend.controller.admin;

import com.orra.Orrabackend.dto.admin.DashboardStatsDTO;
import com.orra.Orrabackend.service.admin.AdminDashboardService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
@AllArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping
    public ResponseEntity<DashboardStatsDTO> getStats() {
        return ResponseEntity.ok(adminDashboardService.getStats());
    }
}
