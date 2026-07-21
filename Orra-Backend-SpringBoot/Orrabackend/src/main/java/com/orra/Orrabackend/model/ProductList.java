package com.orra.Orrabackend.model;

import com.orra.Orrabackend.enums.Category;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "listings")
public class ProductList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    @Column(name = "serial_or_imei", unique = true)
    private String serialOrImei;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    private Integer days;

    @Column(name = "productName")
    private String productName;

    private String description;
    private String brand;
    private String model;

    @Column(name = "purchase_price")
    private BigDecimal purchasePrice;

    @Column(name = "daily_rate")
    private BigDecimal dailyRate;

    @Column(name = "security_deposit")
    private BigDecimal securityDeposit;

//    @Column(name = "health_score")
//    private Integer healthScore;
//
//    private String location;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL
    )
    private List<Productimage> images;
}