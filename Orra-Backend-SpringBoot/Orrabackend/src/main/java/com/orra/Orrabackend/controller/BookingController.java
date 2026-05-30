// BookingController.java
package com.orra.Orrabackend.controller;
import com.orra.Orrabackend.model.Bookings;
import com.orra.Orrabackend.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService service;
    public BookingController(BookingService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Bookings>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Bookings> create(@RequestBody Bookings booking) {
        return ResponseEntity.ok(service.create(booking));
    }
}