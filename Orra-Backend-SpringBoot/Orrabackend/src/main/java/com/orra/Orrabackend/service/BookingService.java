// BookingService.java
package com.orra.Orrabackend.service;
import com.orra.Orrabackend.model.Bookings;
import com.orra.Orrabackend.repository.BookingRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository repo;
    public BookingService(BookingRepository repo) { this.repo = repo; }

    public List<Bookings> getAll() { return repo.findAll(); }
    public Bookings create(Bookings booking) { return repo.save(booking); }
}