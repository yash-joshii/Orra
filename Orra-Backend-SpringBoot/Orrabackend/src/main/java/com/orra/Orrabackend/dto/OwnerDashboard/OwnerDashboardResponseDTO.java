package com.orra.Orrabackend.dto.OwnerDashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OwnerDashboardResponseDTO {

    private Double totalEarnings;

    private Long activeListings;

    private Long completedRentals;

}