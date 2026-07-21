// ProductListRepository.java
package com.orra.Orrabackend.repository;
import com.orra.Orrabackend.model.ProductList;
import com.orra.Orrabackend.model.Productimage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductListRepository extends JpaRepository<ProductList, Long> {
}
