package com.orra.Orrabackend.enums;

public enum BookingStatus {

    PENDING,           // Request sent

    ACCEPTED,          // Owner accepted, waiting for payment

    PAID,              // Payment completed

    ACTIVE,            // Product handed over to renter

    COMPLETED,         // Rental completed

    REJECTED,          // Rejected by owner

    PAYMENT_EXPIRED,   // Didn't pay within 24 hours

    CANCELLED          // Cancelled by renter
}