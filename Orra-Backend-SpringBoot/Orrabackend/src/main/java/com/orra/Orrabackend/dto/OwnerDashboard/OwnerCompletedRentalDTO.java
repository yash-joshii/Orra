package com.orra.Orrabackend.dto.OwnerDashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnerCompletedRentalDTO {

    private Long bookingId;

    private String listingTitle;

    private String renterName;

    private Instant completedDate;

}