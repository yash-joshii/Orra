package com.orra.Orrabackend.dto.transaction;

import lombok.Data;

@Data
public class TransactionRequestDTO {

    private Long bookingId;

    private Double amount;

    private String type;

    private String status;

    private String paymentGatewayRef;

}