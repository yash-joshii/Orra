package com.orra.Orrabackend.dto.productlist;



import com.orra.Orrabackend.model.ProductList;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
public class ProductlistRequestDTO {
    private ProductList product;
    private int days;
    private String productName;
    private String productType;
    private BigDecimal purchasePrice;
    private String brand;
    private String category;
    private String description;
    private String serialOrImei;
    private BigDecimal dailyRate;
  private List <String> images;
}
