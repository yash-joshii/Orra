package com.orra.Orrabackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product_list")
public class ProductList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "owner_id")
    private Long ownerId;

    private String category;
    private String title;
    private String brand;
    private String model;

    @Column(name = "purchase_price")
    private Double purchasePrice;

    @Column(name = "daily_rate")
    private Double dailyRate;

    @Column(name = "security_deposit")
    private Double securityDeposit;

    @Column(name = "health_score")
    private Integer healthScore;

    private String location;

    @Column(name = "is_active")
    private Boolean isActive;
}