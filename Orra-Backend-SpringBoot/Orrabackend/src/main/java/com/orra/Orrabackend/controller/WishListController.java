package com.orra.Orrabackend.controller;


import com.orra.Orrabackend.model.Wishlist;
import com.orra.Orrabackend.repository.WishListRepository;
import com.orra.Orrabackend.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/wishlist")
    //@CrossOrigin(origins = "*")
    public class WishListController {

            @Autowired
            private WishListService wishListService;

            @PostMapping("/add")
            public Wishlist addToWishlist(@RequestParam Long userId, @RequestParam Long productId){

                return wishListService.addToWishlist(userId, productId);
            }

        @DeleteMapping("/delete")
        public String  removeFromWishlist(@RequestParam Long userId, @RequestParam Long productId){

            wishListService.removeFromWishlist(userId, productId);
            return "Product removed from wishlist successfully";
        }

        @GetMapping("/userWishlist")
        public List<Wishlist> getWishlist(@RequestParam Long userId){

            return wishListService.getWishlistByUser(userId);
        }

        @GetMapping("/check")
        public boolean checkWishlist(@RequestParam Long userId, @RequestParam Long productId){

            return wishListService.isProductInWishlist(userId, productId);
        }



}
