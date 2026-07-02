// ProductListController.java
package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.productlist.ProductlistRequestDTO;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.repository.ProductListImageRepository;
import com.orra.Orrabackend.repository.ProductListRepository;
import com.orra.Orrabackend.service.ProductListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductListController {
    @Autowired
    private ProductListService productlistservice;
    @Autowired
    private ProductListImageRepository productListImageRepository;

    @GetMapping("/product")
    public ResponseEntity<List<ProductList>> getAll() {
        return new ResponseEntity<>(productlistservice.getAll(), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<ProductList> getOne(@PathVariable Long id) {
        return new ResponseEntity<>(productlistservice.getOne(id), HttpStatus.OK);
    }

    @PostMapping("/createProduct")
    public ResponseEntity<ProductList> create(@RequestBody ProductlistRequestDTO dto) {
       ProductList saved = productlistservice.Createwithimage(dto.getProduct(),dto.getImages());

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @PatchMapping("/product/{id}")
    public ResponseEntity<ProductList> update(@PathVariable Long id, @RequestBody ProductList productList) {
        return new ResponseEntity<>(productlistservice.update(productList), HttpStatus.OK);
    }


    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        productlistservice.delete(id);
        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }



}