// ProductListService.java
package com.orra.Orrabackend.service;

import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.repository.ProductListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductListService {
    @Autowired
    private ProductListRepository repo;


    public List<ProductList> getAll() {
        return repo.findAll();
    }

    public ProductList getOne(Long id) {
        return repo.findById(id).orElse(null);
    }

    public ProductList create(ProductList product) {
        return repo.save(product);
    }

    public ProductList update(ProductList product) {
        ProductList existing = repo.findById(product.getProductId()).orElse(null);

        if (existing != null) {
            if (product.getProductName() != null)
                existing.setProductName(product.getProductName());

            if (product.getCategory() != null)
                existing.setCategory(product.getCategory());

            if (product.getBrand() != null)
                existing.setBrand(product.getBrand());

            if (product.getDescription() != null)
                existing.setDescription(product.getDescription());

            if (product.getModel() != null)
                existing.setModel(product.getModel());

            if (product.getDailyRate() != null)
                existing.setDailyRate(product.getDailyRate());

            if (product.getSecurityDeposit() != null)
                existing.setSecurityDeposit(product.getSecurityDeposit());

            if (product.getPurchasePrice() != null)
                existing.setPurchasePrice(product.getPurchasePrice());

            if (product.getIsActive() != null)
                existing.setIsActive(product.getIsActive());

            return repo.save(existing);
        }
        return null;
    }

    public void delete(Long id) {
        repo.deleteById(id);
        repo.findById(id);
    }
}