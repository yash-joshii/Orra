package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.booking.BookingRequestDTO;
import com.orra.Orrabackend.dto.booking.BookingResponseDTO;
import com.orra.Orrabackend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(@RequestBody BookingRequestDTO request){
        BookingResponseDTO response = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //Owner Dashboard
    @PatchMapping("/{bookingId}/accept")
    public ResponseEntity<BookingResponseDTO> acceptBooking(@PathVariable Long bookingId){
        BookingResponseDTO response = bookingService.acceptBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{bookingId}/reject")
    public ResponseEntity<BookingResponseDTO> rejectBooking(@PathVariable Long bookingId){
        BookingResponseDTO response = bookingService.rejectBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{bookingId}/ship")
    public ResponseEntity<BookingResponseDTO> shipBooking(@PathVariable Long bookingId){
        BookingResponseDTO response = bookingService.shipBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    //Customer Side
    @PatchMapping("/{bookingId}/pay")
    public ResponseEntity<BookingResponseDTO> payForBooking(@PathVariable Long bookingId){
        BookingResponseDTO response = bookingService.payForBooking(bookingId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{bookingId}/confirm-receipt")
    public ResponseEntity<BookingResponseDTO> confirmReceipt(@PathVariable Long bookingId){
        BookingResponseDTO response = bookingService.confirmReceipt(bookingId);
        return ResponseEntity.ok(response);
    }

    //Renter - My Bookings
    @GetMapping("/renter/{renterId}")
    public ResponseEntity<List<BookingResponseDTO>> getMyBooking(@PathVariable Long renterId){
        List<BookingResponseDTO> response = bookingService.getMyBookings(renterId);
        return ResponseEntity.ok(response);
    }

    //Owner Dashboard
    @GetMapping("/owner/{ownerId}/incoming")
    public ResponseEntity<List<BookingResponseDTO>> getIncomingRequests(@PathVariable Long ownerId){
        List<BookingResponseDTO> response = bookingService.getIncomingRequests(ownerId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/renter/{ownerId}")
    public ResponseEntity<List<BookingResponseDTO>> getOwnerBookings(@PathVariable Long ownerId){
        List<BookingResponseDTO> response = bookingService.getOwnerBookings(ownerId);
        return ResponseEntity.ok(response);
    }

    //Orra Dashboard Panel
//    @GetMapping("/admin/all")
//    public ResponseEntity<List<BookingResponseDTO>> getAllBookingsForAdmin(
//            @RequestParam(required = false) String status){
//        return ResponseEntity.ok(bookingService.getAllBookingsForAdmin(status));
//    }
}
