package com.orra.Orrabackend.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import com.orra.Orrabackend.dto.booking.BookingRequestDTO;
import com.orra.Orrabackend.dto.booking.BookingResponseDTO;
import com.orra.Orrabackend.dto.transaction.TransactionRequestDTO;
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
public class bookingService {
    private final BookingRepository bookingRepository;
    private final ProductListRepository productListRepository;
    private final UserRepository userRepository;
    private final TransactionService transactionService;
    private final NotificationService notificationService;

    private static final long ACCEPT_TO_PAY_TIMEOUT_DAYS = 1;
//    private static final long PAY_TO_SHIP_TIMEOUT_DAYS = 5;

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

        // Listing must be active
        if (!listing.getIsActive()) {
            throw new IllegalStateException(
                    "This listing is not active.");
        }

        // Product must be available
        if (!listing.getIsAvailable()) {
            throw new IllegalStateException(
                    "This product is currently unavailable.");
        }

        BigDecimal totalPrice = listing.getDailyRate().multiply(BigDecimal.valueOf(days));

        Booking booking = new Booking();
        booking.setListing(listing);
        booking.setRenter(renter);
        booking.setStartDateTime(request.getStartDateTime());
        booking.setEndDateTime(request.getEndDateTime());
        booking.setTotalPrice(totalPrice);
        booking.setDepositAmount(listing.getSecurityDeposit());
        booking.setStatus(BookingStatus.PENDING);
        booking.setCreatedAt(Instant.now());

        Booking saved = bookingRepository.save(booking);
        return toResponseDTO(saved);
    }

    @Transactional
    public BookingResponseDTO acceptBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new IllegalStateException(
                    "Only pending bookings can be accepted.");
        }

        // Accept selected booking
        booking.setStatus(BookingStatus.ACCEPTED);
        booking.setAcceptedAt(Instant.now());

        Booking savedBooking = bookingRepository.save(booking);

        // Find all other pending bookings for the same listing
        List<Booking> pendingBookings =
                bookingRepository.findByListing_ProductIdAndStatus(
                        booking.getListing().getProductId(),
                        BookingStatus.PENDING
                );

        // Delete all other pending requests
        for (Booking otherBooking : pendingBookings) {

            if (!otherBooking.getId().equals(savedBooking.getId())) {

                notificationService.createNotification(
                        otherBooking.getRenter(),
                        otherBooking,
                        "Your booking request was not selected by the owner.",
                        "BOOKING_REJECTED"
                );

                bookingRepository.delete(otherBooking);
            }
        }

        // Notify accepted renter
        notificationService.createNotification(
                savedBooking.getRenter(),
                savedBooking,
                "Your booking request has been accepted. Please complete the payment within 24 hours.",
                "BOOKING_ACCEPTED"
        );

        return toResponseDTO(savedBooking);
    }

//    private static final BigDecimal PLATFORM_FEE_RATE = new BigDecimal("0.10");

    @Transactional
    public BookingResponseDTO payForBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Only accepted bookings can be paid
        if (booking.getStatus() != BookingStatus.ACCEPTED) {
            throw new IllegalStateException(
                    "Only accepted bookings can be paid.");
        }

        // Update booking
        booking.setStatus(BookingStatus.COMPLETED);
        booking.setPaidAt(Instant.now());

        // Make listing unavailable
        ProductList listing = booking.getListing();
        listing.setIsAvailable(false);

        // Save listing first
        productListRepository.save(listing);

        // Save booking
        Booking savedBooking = bookingRepository.save(booking);

        // Notify owner
        notificationService.createNotification(
                booking.getListing().getOwner(),
                savedBooking,
                "Payment received successfully. Booking confirmed.",
                "PAYMENT_SUCCESS"
        );
        return toResponseDTO(savedBooking);
    }

    public BookingResponseDTO rejectBooking(Long bookingId){
        Booking booking = getBookingOrThrow(bookingId);
        if(booking.getStatus() != BookingStatus.PENDING && booking.getStatus() != BookingStatus.ACCEPTED){
            throw new IllegalStateException("Booking cannot be rejected from status: " + booking.getStatus());
        }
        BookingResponseDTO responseDTO = toResponseDTOWithOverride(booking, BookingStatus.REJECTED);
        bookingRepository.delete(booking);
        return responseDTO;
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

    public BookingResponseDTO getBookingById(Long bookingId){
        Booking booking = getBookingOrThrow(bookingId);
        return toResponseDTO(booking);
    }

    public BookingResponseDTO cancelBooking(Long bookingId, Long renterId){
        Booking booking = getBookingOrThrow(bookingId);

        if(!booking.getRenter().getId().equals(renterId)){
            throw new IllegalStateException("Only the renter who made this booking can cancel it");
        }
        if(booking.getStatus() != BookingStatus.PENDING && booking.getStatus() != BookingStatus.ACCEPTED){
            throw new IllegalStateException("Booking cannot be cancelled from status: " + booking.getStatus());
        }
        BookingResponseDTO responseDTO = toResponseDTOWithOverride(booking, BookingStatus.CANCELLED);
        bookingRepository.delete(booking);
        return responseDTO;
    }

    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void expireAcceptedBookings() {

        List<Booking> bookings =
                bookingRepository.findByStatus(
                        BookingStatus.ACCEPTED);

        Instant now = Instant.now();

        for (Booking booking : bookings) {

            if (booking.getAcceptedAt() != null &&
                    booking.getAcceptedAt()
                            .plus(Duration.ofDays(1))
                            .isBefore(now)) {

                notificationService.createNotification(
                        booking.getRenter(),
                        booking,
                        "Booking expired because payment was not completed.",
                        "PAYMENT_EXPIRED"
                );

                bookingRepository.delete(booking);
            }
        }
    }

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
                .status(booking.getStatus())
                .createdAt(booking.getCreatedAt())
                .build();
    }

    private BookingResponseDTO toResponseDTOWithOverride(Booking booking, BookingStatus overrideStatus){
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
                .status(overrideStatus)
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
