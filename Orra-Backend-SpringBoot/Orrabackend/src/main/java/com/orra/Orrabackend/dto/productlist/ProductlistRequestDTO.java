package com.orra.Orrabackend.dto.productlist;



import com.orra.Orrabackend.model.ProductList;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductlistRequestDTO {

    private ProductList product;

    private int days;

    private List<String> images;
}