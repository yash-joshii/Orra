package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.model.Productimage;
import org.springframework.data.jpa.repository.JpaRepository;

public  interface  ProductListImageRepository extends JpaRepository<Productimage,Long> {
    
}
