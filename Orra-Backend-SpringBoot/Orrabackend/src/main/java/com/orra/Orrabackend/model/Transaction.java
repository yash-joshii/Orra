package com.orra.Orrabackend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_id")
    private Long bookingId;

    private Double amount;
    private String type;
    private String status;

    @Column(name = "payment_gateway_ref")
    private String paymentGatewayRef;

    @Column(name = "date_of_payment")
    private LocalDate dateOfPayment;
}
