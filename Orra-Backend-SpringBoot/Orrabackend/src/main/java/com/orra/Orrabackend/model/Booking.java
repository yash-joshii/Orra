package com.orra.Orrabackend.model;

import com.orra.Orrabackend.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Entity
@Table(
        name = "bookings",
        schema = "public"
)
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long id;

    // renter_id foreign key from users table

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "renter_id")
    private User renter;

    // listing_id foreign key from listings table

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id", referencedColumnName = "product_id")
    private ProductList listing;

    @Column(name = "start_datetime")
    private Instant startDateTime;

    @Column(name = "end_datetime")
    private Instant endDateTime;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "deposit_amount")
    private BigDecimal depositAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private BookingStatus status;

    @Column(name = "created_at")
    private Instant createdAt;

    //New Fields to be updated in Database

    @Column(name ="accepted_at")
    private Instant acceptedAt;

    @Column(name = "paid_at")
    private Instant paidAt;

    @Column(name = "shipped_at")
    private Instant shippedAt;

    @Column(name = "completed_at")
    private Instant completedAt;
}
