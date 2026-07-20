// ProductListController.java
package com.orra.Orrabackend.controller;
import com.orra.Orrabackend.model.ProductList;
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
    private ProductListService productListService;

    @GetMapping("/product")
    public ResponseEntity<List<ProductList>> getAll() {
        return new ResponseEntity<>(productListService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
     public ResponseEntity<ProductList> getOne(@PathVariable Long id){
            return new ResponseEntity<>(productListService.getOne(id),HttpStatus.OK);
        }
        @PostMapping("/createProduct")
        public ResponseEntity<ProductList> create(@RequestBody ProductList productList) {
            return new ResponseEntity<>(productListService.create(productList),HttpStatus.CREATED);
    }

    @PatchMapping("/product/{id}")
    public ResponseEntity<ProductList> update(@PathVariable Long id, @RequestBody ProductList productList) {
        return  new ResponseEntity<>(productListService.update(productList),HttpStatus.OK);
    }


    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
       productListService.delete(id);
        return  new ResponseEntity<>("Product deleted",HttpStatus.OK);
    }

}