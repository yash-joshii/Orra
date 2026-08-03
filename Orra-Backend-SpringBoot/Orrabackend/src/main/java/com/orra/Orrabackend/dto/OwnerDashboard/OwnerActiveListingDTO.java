package com.orra.Orrabackend.dto.OwnerDashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OwnerActiveListingDTO {

    private Long listingId;

    private String title;

    private String category;

    private BigDecimal pricePerDay;

    private String imageUrl;

}