package com.orra.Orrabackend.service;


import com.orra.Orrabackend.dto.BookingRequestDTO;
import com.orra.Orrabackend.model.Booking;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.BookingRepository;
import com.orra.Orrabackend.repository.ProductListRepository;
import com.orra.Orrabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;


@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductListRepository productListRepository;


    public Booking createBooking(BookingRequestDTO details)
        {

            User renter =
                    userRepository
                            .findById(details.getRenterId())
                            .orElseThrow();

            ProductList productList =
                    productListRepository
                            .findById(details.getListingId())
                            .orElseThrow();

            Booking booking = new Booking();

            booking.setRenter(renter);


            booking.setListing(productList);


            booking.setStartDateTime(
                    details.getStartDateTime()
            );


            booking.setEndDateTime(
                    details.getEndDateTime()
            );


            booking.setTotalPrice(
                    details.getTotalPrice()
            );


            booking.setDepositAmount(
                    details.getDepositAmount()
            );


            booking.setStatus("PENDING");


            booking.setCreatedAt(
                    Instant.now()
            );


            return bookingRepository.save(booking);

        }
    }



