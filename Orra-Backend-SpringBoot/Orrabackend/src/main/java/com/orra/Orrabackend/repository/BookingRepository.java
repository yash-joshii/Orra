package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.enums.BookingStatus;
import com.orra.Orrabackend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByRenter_Id(Long renterId);

    // Used by Action Center
    List<Booking> findByListing_OwnerIdAndStatus(
            Long ownerId,
            BookingStatus status
    );

    // Used to get all bookings
    List<Booking> findByListing_OwnerId(Long ownerId);

    // Used only by Dashboard Statistics
    long countByListing_OwnerIdAndStatus(
            Long ownerId,
            BookingStatus status
    );

    long countByRenterId(Long renterId);


    @Query("SELECT COALESCE(SUM(b.totalPrice), 0) FROM Booking b WHERE b.paymentStatus = 'PAID'")
    double sumTotalRevenue();
}