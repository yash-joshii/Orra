package com.orra.Orrabackend.model;

import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Entity;
import lombok.Data;
import org.springframework.stereotype.Indexed;

//MODEL Layer — Maps to Supabase Tables

@Data
@Entity
@Table(name ="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String name;
    private String email;
    private String phone;
    private String password;

//    @Column(name = "profile_pic")
//    private String profilePic;

    private String address;
    private String role;  // "renter", "purchaser", "both"

//    @Column(name = "id_proof")
//    private String idProof;
}