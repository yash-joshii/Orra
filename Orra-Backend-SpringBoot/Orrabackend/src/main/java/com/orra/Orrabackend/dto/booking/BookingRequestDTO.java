package com.orra.Orrabackend.dto.booking;

import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
public class BookingRequestDTO {
    private Long listingId;
    private Long renterId;
    private LocalDate startDateTime;
    private LocalDate endDateTime;
}
