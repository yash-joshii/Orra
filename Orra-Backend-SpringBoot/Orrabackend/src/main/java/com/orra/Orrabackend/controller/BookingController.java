package com.orra.Orrabackend.controller;



import com.orra.Orrabackend.dto.BookingRequestDTO;
import com.orra.Orrabackend.model.Booking;
import com.orra.Orrabackend.service.BookingService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/bookings")
public class BookingController {


    private final BookingService bookingService;



    public BookingController(
            BookingService bookingService
    ){

        this.bookingService = bookingService;

    }



    // CREATE BOOKING API

    @PostMapping("/create")
    public Booking createBooking(
            @RequestBody BookingRequestDTO details
    ){

        return bookingService.createBooking(details);

    }


}