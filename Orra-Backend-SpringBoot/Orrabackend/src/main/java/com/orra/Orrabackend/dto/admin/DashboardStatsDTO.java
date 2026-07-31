package com.orra.Orrabackend.dto.admin;

import lombok.Data;

@Data
public class DashboardStatsDTO {

    private double totalRevenue;
    private long totalUsers;
    private long activeProducts;
    private long pendingApproval;
}
