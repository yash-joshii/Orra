// ProductListRepository.java
package com.orra.Orrabackend.repository;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.model.Productimage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface ProductListRepository extends JpaRepository<ProductList, Long> {



    @Query("SELECT p.category AS category, COUNT(p) AS count " +
        "FROM ProductList p " +
            "WHERE p.isActive = true " +
            "GROUP BY p.category")
    List<CategoryCountProjection> getCategoryCounts();


    @Query("SELECT p FROM ProductList p WHERE " +
            "LOWER(p.productName) LIKE LOWER(CONCAT(:keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT(:keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT(:keyword, '%'))")
    List<ProductList> searchProducts(@Param("keyword") String keyword);

}

