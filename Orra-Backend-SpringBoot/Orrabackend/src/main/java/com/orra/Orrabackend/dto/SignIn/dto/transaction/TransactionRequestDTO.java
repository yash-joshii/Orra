package com.orra.Orrabackend.dto.SignIn.dto.transaction;

import lombok.Data;

@Data
public class TransactionRequestDTO {

    private Long bookingId;

    private Double amount;

    private String type;

    private String status;

    private String paymentGatewayRef;

}