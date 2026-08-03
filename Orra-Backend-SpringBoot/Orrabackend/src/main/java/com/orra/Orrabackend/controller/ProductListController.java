package com.orra.Orrabackend.controller;

    import com.orra.Orrabackend.dto.productlist.ProductlistRequestDTO;
    import com.orra.Orrabackend.model.ProductList;
    import com.orra.Orrabackend.repository.CategoryCountProjection;
    import com.orra.Orrabackend.service.ProductListService;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.core.Authentication;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api")
    public class ProductListController {

        private final ProductListService productlistservice;

        public ProductListController(ProductListService productlistservice) {
            this.productlistservice = productlistservice;
        }

        @GetMapping("/product")
        public ResponseEntity<List<ProductList>> getAll() {
            return new ResponseEntity<>(productlistservice.getAll(), HttpStatus.OK);
        }
        @GetMapping("/products/search")
        public ResponseEntity<List<ProductList>> searchProducts(
                @RequestParam String keyword) {

            return new ResponseEntity<>(
                    productlistservice.searchProducts(keyword),
                    HttpStatus.OK
            );
        }
        @GetMapping("/product/{id}")
        public ResponseEntity<ProductList> getOne(@PathVariable Long id) {
            return new ResponseEntity<>(productlistservice.getOne(id), HttpStatus.OK);
        }

    @PostMapping("/createProduct")
    public ResponseEntity<ProductList> create(@RequestBody ProductlistRequestDTO dto,
                                              Authentication authentication) {
        Long userId = (Long) authentication.getPrincipal();
        ProductList saved = productlistservice.CreateWithImage(dto.getProduct(), dto.getImages(), userId);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

        @PatchMapping("/product/{id}")
        public ResponseEntity<ProductList> update(@PathVariable Long id,
                                                  @RequestBody ProductList productList,
                                                  Authentication authentication) {
            Long userId = (Long) authentication.getPrincipal();
            productList.setProductId(id); // ensure path id wins, not whatever's in the body
            return new ResponseEntity<>(productlistservice.update(productList, userId), HttpStatus.OK);
        }

        @DeleteMapping("/product/{id}")
        public ResponseEntity<String> delete(@PathVariable Long id, Authentication authentication) {
            Long userId = (Long) authentication.getPrincipal();
            productlistservice.delete(id, userId);
            return new ResponseEntity<>("Product deleted", HttpStatus.OK);
        }

        @GetMapping("/product/categories/summary")
        public ResponseEntity<List<CategoryCountProjection>> getCategorySummary() {
            return new ResponseEntity<>(productlistservice.getCategorySummary(), HttpStatus.OK);
        }
    }