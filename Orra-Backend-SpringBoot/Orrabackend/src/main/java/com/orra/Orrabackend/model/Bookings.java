//package com.orra.Orrabackend.model;
//
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
//    private Long ownerId;
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
//    private String status; // pending/confirmed/active/completed/disputed/cancelled
//}
