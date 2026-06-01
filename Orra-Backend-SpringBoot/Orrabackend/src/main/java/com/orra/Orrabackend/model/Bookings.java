//package com.orra.Orrabackend.model;
//
//import com.orra.Orrabackend.enums.BookingStatus;
//import jakarta.persistence.*;
//import lombok.Data;
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//@Table(name = "booking")
//public class Bookings {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "listing_id")
//    private Long listingId;
//
//    @Column(name = "renter_id")
//    private Long renterId;
//
//    @Column(name = "owner_id")
//    private String ownerId;
//
//    @Column(name = "start_datetime")
//    private LocalDateTime startDatetime;
//
//    @Column(name = "end_datetime")
//    private LocalDateTime endDatetime;
//
//    @Column(name = "total_price")
//    private Double totalPrice;
//
//    @Column(name = "deposit_amount")
//    private Double depositAmount;
//
//    @Enumerated(EnumType.STRING)   // ← tells Hibernate to store as text not number
//    private BookingStatus status; // pending/confirmed/active/completed/disputed/cancelled
//}
