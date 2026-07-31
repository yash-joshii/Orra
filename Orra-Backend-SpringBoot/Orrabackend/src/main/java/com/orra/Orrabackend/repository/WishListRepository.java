package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishListRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUser(User user);

    Optional<Wishlist> findByUserAndProductList(User user, ProductList productList);

   // Void deleteByUserAndProduct(User user, ProductList productList);

    boolean existsByUserAndProductList(User user, ProductList productList);


}
