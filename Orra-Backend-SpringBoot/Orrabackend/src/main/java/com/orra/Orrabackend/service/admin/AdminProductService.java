package com.orra.Orrabackend.service.admin;

import com.orra.Orrabackend.dto.admin.ProductApprovalDTO;
import com.orra.Orrabackend.enums.ListingStatus;
import com.orra.Orrabackend.exception.ResourceNotFoundException;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.repository.ProductListRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminProductService {

    private final ProductListRepository productListRepository;

    public Page<ProductApprovalDTO> getProducts(ListingStatus status, Pageable pageable) {
        Page<ProductList> products = (status != null)
                ? productListRepository.findByApprovalStatus(status, pageable)
                : productListRepository.findAll(pageable);
        return products.map(this::toDTO);
    }

    public void approveProduct(Long productId) {
        ProductList product = productListRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setApprovalStatus(ListingStatus.ACTIVE);
        productListRepository.save(product);
    }

    public void rejectProduct(Long productId) {
        ProductList product = productListRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setApprovalStatus(ListingStatus.REJECTED);
        productListRepository.save(product);
    }

    public void disableProduct(Long productId) {
        ProductList product = productListRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setApprovalStatus(ListingStatus.DISABLED);
        productListRepository.save(product);
    }

    private ProductApprovalDTO toDTO(ProductList p) {
        ProductApprovalDTO dto = new ProductApprovalDTO();
        dto.setProductId(p.getProductId());
        dto.setProductName(p.getProductName());
        dto.setCategory(p.getCategory().name());
        dto.setOwnerName(p.getOwner().getName());   // CHECK — confirm User has getName()
        dto.setDailyRate(p.getDailyRate());
        dto.setApprovalStatus(p.getApprovalStatus().name());
        return dto;
    }
}
