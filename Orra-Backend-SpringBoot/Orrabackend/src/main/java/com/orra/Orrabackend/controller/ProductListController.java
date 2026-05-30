// ProductListController.java
package com.orra.Orrabackend.controller;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.service.ProductListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductListController {
    private final ProductListService service;
    public ProductListController(ProductListService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<ProductList>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<ProductList> create(@RequestBody ProductList product) {
        return ResponseEntity.ok(service.create(product));
    }
}