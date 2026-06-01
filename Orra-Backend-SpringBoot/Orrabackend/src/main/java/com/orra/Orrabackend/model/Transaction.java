//package com.orra.Orrabackend.model;
//
//import com.orra.Orrabackend.enums.TransactionStatus;
//import com.orra.Orrabackend.enums.TransactionType;
//import jakarta.persistence.*;
//import lombok.Data;
//import java.time.LocalDate;
//
//@Data
//@Entity
//@Table(name = "transaction")
//public class Transaction {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name = "booking_id")
//    private Long bookingId;
//
//    private Double amount;
//
//    @Enumerated(EnumType.STRING)   // ← tells Hibernate to store as text not number
//    private TransactionType type;
//
//    @Enumerated(EnumType.STRING)   // ← tells Hibernate to store as text not number
//    private TransactionStatus status;
//
//    @Column(name = "payment_gateway_ref")
//    private String paymentGatewayRef;
//
//    @Column(name = "date_of_payment")
//    private LocalDate dateOfPayment;
//}
