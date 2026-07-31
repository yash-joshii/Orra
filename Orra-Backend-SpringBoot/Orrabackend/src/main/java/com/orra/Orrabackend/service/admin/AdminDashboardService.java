package com.orra.Orrabackend.service.admin;

import com.orra.Orrabackend.dto.admin.DashboardStatsDTO;
import com.orra.Orrabackend.repository.BookingRepository;
import com.orra.Orrabackend.repository.ProductListRepository;
import com.orra.Orrabackend.repository.UserRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AdminDashboardService {
    private final UserRepository userRepository;
    private final ProductListRepository listingRepository;
    private final BookingRepository bookingRepository;

    public DashboardStatsDTO getStats() {
        DashboardStatsDTO dto = new DashboardStatsDTO();
        dto.setTotalRevenue(bookingRepository.sumTotalRevenue());
        dto.setTotalUsers(userRepository.count());
//        dto.setActiveProducts(listingRepository.countByStatus("ACTIVE"));
//        dto.setPendingApproval(listingRepository.countByStatus("PENDING"));
        return dto;
    }
}
