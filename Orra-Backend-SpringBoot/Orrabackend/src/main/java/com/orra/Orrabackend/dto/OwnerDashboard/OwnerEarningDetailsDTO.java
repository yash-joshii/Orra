package com.orra.Orrabackend.dto.OwnerDashboard;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnerEarningDetailsDTO {

    private Long bookingId;

    private String listingTitle;

    private Double amount;

    private Instant createdAt;

}