package com.orra.Orrabackend.dto.admin;

import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
public class AdminUserDTO {
    private Long id;
    private String name;
    private String email;
    private List<String> roles;
    private String status;       // ACTIVE, PENDING, BLOCKED
    private boolean verified;
    private Instant joinedDate;
    private long listingsCount;
    private long rentalsCount;
}
