package com.orra.Orrabackend.service;

import com.orra.Orrabackend.exception.DuplicateWishlistException;
import com.orra.Orrabackend.exception.ProductNotFoundException;
import com.orra.Orrabackend.exception.UserNotFoundException;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.model.Wishlist;
import com.orra.Orrabackend.repository.ProductListRepository;
import com.orra.Orrabackend.repository.UserRepository;
import com.orra.Orrabackend.repository.WishListRepository;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WishListService {

    @Autowired
    private WishListRepository wishListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductListRepository productListRepository;

    public Wishlist addToWishlist(Long userId, Long productId){

        User user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("User not Found"+ userId));

        ProductList productList = productListRepository.findById(productId)
                .orElseThrow(()-> new ProductNotFoundException("Product not found" +productId));

        if (wishListRepository.existsByUserAndProductList(user, productList)) {
            throw new DuplicateWishlistException("Product already exists in wishlist");
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setProductList(productList);
        wishlist.setAddedAt(LocalDateTime.now());

        return wishListRepository.save(wishlist);

    }

    public void removeFromWishlist(Long userId, Long productId){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User Not Found" +userId));

        ProductList productList = productListRepository.findById(productId)
                .orElseThrow(()-> new ProductNotFoundException("Product Not Found" +productId));

        Wishlist wishlist = wishListRepository.findByUserAndProductList(user, productList)
                .orElseThrow(() -> new RuntimeException("Wishlist item not found"));

        wishListRepository.delete(wishlist);
    }
    public List<Wishlist> getWishlistByUser(Long userId){
        User user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("User not found" +userId));

        return wishListRepository.findByUser(user);
    }

    public boolean isProductInWishlist(Long userId, Long productId){

        User user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("User not found" +userId));

        ProductList productList = productListRepository.findById(productId)
                .orElseThrow(()->new ProductNotFoundException("Product not found" +productId));

        return wishListRepository.existsByUserAndProductList(user, productList);
    }

}
