package com.orra.Orrabackend.dto.admin;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DashboardStatsDTO {

    private BigDecimal totalRevenue;
    private long totalUsers;
    private long activeProducts;
    private long pendingApproval;
}
