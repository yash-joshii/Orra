package com.orra.Orrabackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.orra.Orrabackend.enums.Category;
import com.orra.Orrabackend.enums.ListingStatus;
//import com.orra.Orrabackend.enums.ProductCondition;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Data;
//import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
    @JoinColumn(name = "owner_id", referencedColumnName = "user_id")
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

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status")
    private ListingStatus approvalStatus = ListingStatus.PENDING;
    private String location;

  @Column(name = "is_active")
  private Boolean isActive = true;

  //  @Column(name = "created_at")
  //  private LocalDateTime createdAt;

    @Column(name ="purchase_year")
    private Integer purchaseYear;

//    @Enumerated(EnumType.STRING)
//    @Column(name = "product_condition")
//    private ProductCondition productcondition;

//    @Column(name = "available_from")
    private LocalDate availableFrom;

    @Column(name = "available_to")
    private LocalDate availableTo;

    @Column(name = "minimum_rental_days")
    private Integer minimumRentalDays;

    @Column(name = "maximum_rental_days")
    private Integer maximumRentalDays;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private List<String> productspec;

    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Productimage> images;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable = true;

    // 1. Calculate rental days between availableFrom and availableTo
    @Transient
    @JsonProperty("rentals")
    public Long getRentals() {
        if (availableFrom != null && availableTo != null) {
            long days = ChronoUnit.DAYS.between(availableFrom, availableTo) + 1; // +1 to include start day
            return days >= 0 ? days : 0L;
        }
        return 0L;
    }

    // 2. Calculate earnings = (rentals * dailyRate)
    @Transient
    @JsonProperty("earnings")
    public BigDecimal getEarnings() {
        Long totalRentals = getRentals();
        if (dailyRate != null && totalRentals > 0) {
            return dailyRate.multiply(BigDecimal.valueOf(totalRentals));
        }
        return BigDecimal.ZERO;
    }
}



