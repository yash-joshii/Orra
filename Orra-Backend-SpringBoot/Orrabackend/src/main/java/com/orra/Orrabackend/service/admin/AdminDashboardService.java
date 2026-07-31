package com.orra.Orrabackend.service.admin;

import com.orra.Orrabackend.dto.admin.DashboardStatsDTO;
import com.orra.Orrabackend.enums.BookingStatus;
import com.orra.Orrabackend.enums.ListingStatus;
import com.orra.Orrabackend.repository.BookingRepository;
import com.orra.Orrabackend.repository.ProductListRepository;
import com.orra.Orrabackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminDashboardService {
    private final UserRepository userRepository;
    private final ProductListRepository listingRepository;
    private final BookingRepository bookingRepository;

    public DashboardStatsDTO getStats() {
        DashboardStatsDTO dto = new DashboardStatsDTO();
        dto.setTotalRevenue(bookingRepository.sumTotalRevenueByStatus(BookingStatus.COMPLETED));
        dto.setTotalUsers(userRepository.count());
        dto.setActiveProducts(listingRepository.countByApprovalStatus(ListingStatus.ACTIVE));     // CHANGED — uncomment + fixed
        dto.setPendingApproval(listingRepository.countByApprovalStatus(ListingStatus.PENDING));   // CHANGED — uncomment + fixed
        return dto;
    }
}
