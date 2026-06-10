package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}
