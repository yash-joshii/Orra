package com.orra.Orrabackend.service;

import com.orra.Orrabackend.dto.booking.BookingRequestDTO;
import com.orra.Orrabackend.dto.booking.BookingResponseDTO;
import com.orra.Orrabackend.enums.BookingStatus;
import com.orra.Orrabackend.model.Booking;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.BookingRepository;
import com.orra.Orrabackend.repository.ProductListRepository;
import com.orra.Orrabackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final ProductListRepository productListRepository;
    private final UserRepository userRepository;

    private static final long ACCEPT_TO_PAY_TIMEOUT_DAYS = 5;
    private static final long PAY_TO_SHIP_TIMEOUT_DAYS = 5;

    public BookingResponseDTO createBooking(BookingRequestDTO request){
        ProductList listing = productListRepository.findById(request.getListingId())
                .orElseThrow(() -> new RuntimeException("Listing Not Found"));

        User renter = userRepository.findById(request.getRenterId())
                .orElseThrow(() -> new RuntimeException("Renter Not Found"));

        // Prevent owner from booking their own listing
        if (listing.getOwner().getId().equals(renter.getId())) {
            throw new IllegalStateException("Owner cannot book their own listing");
        }

        long days = Duration.between(request.getStartDateTime(), request.getEndDateTime()).toDays();
        if(days <= 0) {
            throw new IllegalArgumentException("End date must be after start date");
        }

        BigDecimal totalPrice = listing.getDailyRate().multiply(BigDecimal.valueOf(days));

        Booking booking = new Booking();
        booking.setListing(listing);
        booking.setRenter(renter);
        booking.setStartDateTime(request.getStartDateTime());
        booking.setEndDateTime(request.getEndDateTime());
        booking.setTotalPrice(totalPrice);
        booking.setStatus(BookingStatus.PENDING);
        booking.setCreatedAt(Instant.now());

        Booking saved = bookingRepository.save(booking);
        return toResponseDTO(saved);
    }

    public BookingResponseDTO acceptBooking(Long bookingId){
        Booking booking = getBookingOrThrow(bookingId);
        requireStatus(booking, BookingStatus.PENDING);
        booking.setStatus(BookingStatus.ACCEPTED);
        booking.setAcceptedAt(Instant.now());
        return toResponseDTO(bookingRepository.save(booking));
    }

    public BookingResponseDTO payForBooking(Long bookingId){
        Booking booking = getBookingOrThrow(bookingId);
        requireStatus(booking, BookingStatus.ACCEPTED);
        booking.setStatus(BookingStatus.PAID);
        booking.setPaidAt(Instant.now());
        return toResponseDTO(bookingRepository.save(booking));
    }

    public BookingResponseDTO shipBooking(Long bookingId){
        Booking booking = getBookingOrThrow(bookingId);
        requireStatus(booking, BookingStatus.PAID);
        booking.setStatus(BookingStatus.SHIPPED);
        booking.setShippedAt(Instant.now());
        return toResponseDTO(bookingRepository.save(booking));
    }

    public BookingResponseDTO confirmReceipt(Long bookingId){
        Booking booking = getBookingOrThrow(bookingId);
        requireStatus(booking, BookingStatus.SHIPPED);
        booking.setStatus(BookingStatus.COMPLETED);
        booking.setCompletedAt(Instant.now());
        return toResponseDTO(bookingRepository.save(booking));
    }

    public BookingResponseDTO rejectBooking(Long bookingId){
        Booking booking = getBookingOrThrow(bookingId);
        if(booking.getStatus() != BookingStatus.PENDING && booking.getStatus() != BookingStatus.ACCEPTED){
            throw new IllegalStateException("Booking cannot be rejected from status: " + booking.getStatus());
        }
        booking.setStatus(BookingStatus.REJECTED);
        return toResponseDTO(bookingRepository.save(booking));
    }

    public List<BookingResponseDTO> getMyBookings(Long renterId){
        return bookingRepository.findByRenter_Id(renterId)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<BookingResponseDTO> getIncomingRequests(Long ownerId){
        return bookingRepository.findByListing_OwnerIdAndStatus(ownerId, BookingStatus.PENDING)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public List<BookingResponseDTO> getOwnerBookings(Long ownerId){
        return bookingRepository.findByListing_OwnerId(ownerId)
                .stream()
                .map(this::toResponseDTO)
                .collect((Collectors.toList()));
    }

    //Orra Admin Panel
//    public List<BookingResponseDTO> getAllBookingsAdmin(String statusFilter){
//        List<Booking> bookings;
//
//        if(statusFilter == null || statusFilter.isBlank()){
//            bookings = bookingRepository.findAll();
//        }
//        else{
//            BookingStatus status;
//            try{
//                status = BookingStatus.valueOf(statusFilter.toUpperCase());
//            } catch (IllegalArgumentException ex){
//                throw new IllegalArgumentException("Invalid status filter: " + statusFilter);
//            }
//            bookings = bookingRepository.findByStatus(status);
//        }
//        return bookings.stream()
//                .map(this::toResponseDTO)
//                .collect(Collectors.toList());
//    }

    public Booking getBookingOrThrow(Long bookingId){
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Exception not Found"));
    }

    public void requireStatus(Booking booking, BookingStatus expectedStatus){
        if(booking.getStatus() != expectedStatus){
            throw new IllegalStateException("Expected status '"
                    + expectedStatus + "' but booking is '"
                    + booking.getStatus() + "'");
        }
    }

    private void applyExpiryIfNeeded(Booking booking){
        Instant now = Instant.now();

        if(booking.getStatus() == BookingStatus.ACCEPTED && booking.getAcceptedAt() != null){
            long daysSinceAccepted = Duration.between(booking.getAcceptedAt(), now).toDays();
            if(daysSinceAccepted >= ACCEPT_TO_PAY_TIMEOUT_DAYS){
                booking.setStatus(BookingStatus.REJECTED);
                bookingRepository.save(booking);
            }
        }

        if(booking.getStatus() == BookingStatus.PAID && booking.getPaidAt() != null){
            long daysSincePaid = Duration.between(booking.getPaidAt(), now).toDays();
            if(daysSincePaid >= PAY_TO_SHIP_TIMEOUT_DAYS){
                booking.setStatus(BookingStatus.REFUNDED);
                bookingRepository.save(booking);
            }
        }
    }

    private BookingResponseDTO toResponseDTO(Booking booking){
        applyExpiryIfNeeded(booking);

        return BookingResponseDTO.builder()
                .bookingId(booking.getId())
                .listingId(booking.getListing().getProductId())
                .listingTitle(booking.getListing().getProductName())
                .listingImage(null)
                .dailyRate(booking.getListing().getDailyRate())
                .ownerId(booking.getListing().getOwner().getId())
                .ownerName(booking.getListing().getOwner().getName())
                .renterId(booking.getRenter().getId())
                .renterName(booking.getRenter().getName())
                .startDateTime(booking.getStartDateTime())
                .endDateTime(booking.getEndDateTime())
                .totalPrice(booking.getTotalPrice())
                .depositAmount(booking.getDepositAmount())
                .status(booking.getStatus().name())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
