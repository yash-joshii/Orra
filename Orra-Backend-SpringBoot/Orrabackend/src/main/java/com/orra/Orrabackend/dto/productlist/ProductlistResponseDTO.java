package com.orra.Orrabackend.dto.productlist;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class ProductlistResponseDTO {
     private Long id;
    private int days;
    private String productName;
    private String productType;
    private BigDecimal purchasePrice;
    private String brand;
    private String category;
    private String description;
    private String serialOrImei;
    private BigDecimal dailyRate;
    private List<String> images;
}

