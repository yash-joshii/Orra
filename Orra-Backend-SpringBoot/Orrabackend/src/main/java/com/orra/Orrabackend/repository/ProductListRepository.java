// ProductListRepository.java
package com.orra.Orrabackend.repository;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.model.Productimage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductListRepository extends JpaRepository<ProductList, Long> {
    @Query("SELECT p.category AS category, COUNT(p) AS count " +
        "FROM ProductList p " +
            "WHERE p.isActive = true " +
            "GROUP BY p.category")
    List<CategoryCountProjection> getCategoryCounts();

    long countByOwner_IdAndIsActiveTrue(Long ownerId);
}

