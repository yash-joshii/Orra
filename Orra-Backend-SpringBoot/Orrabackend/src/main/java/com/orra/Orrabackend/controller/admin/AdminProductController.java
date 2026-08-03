package com.orra.Orrabackend.controller.admin;

import com.orra.Orrabackend.dto.admin.ProductApprovalDTO;
import com.orra.Orrabackend.enums.ListingStatus;
import com.orra.Orrabackend.service.admin.AdminProductService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
@AllArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {


    private final AdminProductService adminProductService;

    @GetMapping
    public ResponseEntity<Page<ProductApprovalDTO>> getProducts(
            @RequestParam(required = false) ListingStatus status,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(adminProductService.getProducts(status, pageable));
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<Void> approve(@PathVariable Long id) {
        adminProductService.approveProduct(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<Void> reject(@PathVariable Long id) {
        adminProductService.rejectProduct(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<Void> disable(@PathVariable Long id) {
        adminProductService.disableProduct(id);
        return ResponseEntity.ok().build();
    }
}
