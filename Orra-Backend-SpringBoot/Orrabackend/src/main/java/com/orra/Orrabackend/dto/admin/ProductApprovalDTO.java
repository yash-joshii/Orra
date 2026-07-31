package com.orra.Orrabackend.dto.admin;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ProductApprovalDTO {

    private Long productId;
    private String productName;
    private String category;
    private String ownerName;
    private BigDecimal dailyRate;
    private String approvalStatus;
    private LocalDate submittedDate;
}
