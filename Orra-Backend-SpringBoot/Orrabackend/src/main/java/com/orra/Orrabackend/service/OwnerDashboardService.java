package com.orra.Orrabackend.service;

import com.orra.Orrabackend.dto.OwnerDashboard.OwnerDashboardResponseDTO;
import com.orra.Orrabackend.enums.BookingStatus;
import com.orra.Orrabackend.model.Booking;
import com.orra.Orrabackend.repository.BookingRepository;
import com.orra.Orrabackend.repository.ProductListRepository;
import com.orra.Orrabackend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerDashboardService {

    @Autowired
    private ProductListRepository productListRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public OwnerDashboardResponseDTO getDashboard(Long ownerId) {

        long activeListings =
                productListRepository.countByOwner_IdAndIsActiveTrue(ownerId);

        long completedRentals =
                bookingRepository.countByListing_OwnerIdAndStatus(
                        ownerId,
                        BookingStatus.COMPLETED
                );

        List<Booking> bookings =
                bookingRepository.findByListing_OwnerId(ownerId);

        List<Long> bookingIds =
                bookings.stream()
                        .map(Booking::getId)
                        .toList();

        Double totalEarnings =
                bookingIds.isEmpty()
                        ? 0.0
                        : transactionRepository.getTotalEarnings(bookingIds);

        return new OwnerDashboardResponseDTO(
                totalEarnings,
                activeListings,
                completedRentals
        );
    }
}