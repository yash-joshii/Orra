package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.enums.BookingStatus;
import com.orra.Orrabackend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByRenter_Id(Long renter_Id);
    List<Booking> findByListing_OwnerIdAndStatus(Long ownerId, BookingStatus status);
    List<Booking> findByListing_OwnerId(Long ownerId);
//    List<Booking> findByStatus(BookingStatus status);
}
