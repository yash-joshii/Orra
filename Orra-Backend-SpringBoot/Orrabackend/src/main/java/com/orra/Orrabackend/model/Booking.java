package com.orra.Orrabackend.model;




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



    @Column(name = "status")
    private String status;



    @Column(name = "created_at")
    private Instant createdAt;



}
