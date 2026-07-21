package com.orra.Orrabackend.dto.booking;

import lombok.Data;

import java.time.Instant;

@Data
public class BookingRequestDTO {
    private Long listingId;
    private Long renterId;
    private Instant startDateTime;
    private Instant endDateTime;
}
