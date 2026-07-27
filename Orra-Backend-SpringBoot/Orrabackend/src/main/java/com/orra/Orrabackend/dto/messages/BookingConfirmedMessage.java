package com.orra.Orrabackend.dto.messages;


import lombok.Data;

@Data
public class BookingConfirmedMessage {
    private Long transactionId;
    private Long bookingId;
    private String status;
    private String reason;

}
