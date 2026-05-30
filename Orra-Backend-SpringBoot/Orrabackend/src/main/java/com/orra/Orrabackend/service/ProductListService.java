// ProductListService.java
package com.orra.Orrabackend.service;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.repository.ProductListRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductListService {
    private final ProductListRepository repo;
    public ProductListService(ProductListRepository repo) { this.repo = repo; }

    public List<ProductList> getAll() { return repo.findAll(); }
    public ProductList create(ProductList product) { return repo.save(product); }
}