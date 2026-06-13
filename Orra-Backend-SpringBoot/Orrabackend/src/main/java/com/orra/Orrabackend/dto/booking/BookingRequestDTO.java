package com.orra.Orrabackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {

    private Long renterId;


    private Long listingId;


    private Instant startDateTime;


    private Instant endDateTime;


    private BigDecimal totalPrice;


    private BigDecimal depositAmount;


}
