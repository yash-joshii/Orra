package com.orra.Orrabackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "listing_images")
public class Productimage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")  // fix — actual PK column
    private Long id;

    @Column(name = "image_data", columnDefinition = "TEXT")
    private String imageBase64;

    @Column(name = "is_cover")
    private Boolean isCover = false;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    @ManyToOne
    @JoinColumn(name = "listing_id")  // FK to listings.product_id
    @JsonIgnore
    private ProductList product;


}
