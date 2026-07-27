package com.orra.Orrabackend.dto.messages;

import lombok.Data;

@Data
public class PaymentSuccessMessage {

    private Long transactionId;
    private Long bookingId;
    private Double amount;
    private String paymentId;
    private String status;
}
