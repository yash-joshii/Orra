package com.orra.Orrabackend.model;

import com.orra.Orrabackend.enums.UserIdProof;
import com.orra.Orrabackend.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Entity;
//import lombok.Data;

//MODEL Layer — Maps to Suppabase Tables

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String username; //Added this attribute here not in the database (Hibernate will add it internally)

    private String email;
    private String phone;
    private String password;

    @Column(name = "profile_pic")
    private String profilePic;

    private String address;

    @Enumerated(EnumType.STRING)   // ← tells Hibernate to store as text not number
    private UserRole role;  // "renter", "purchaser", "both"

    @Enumerated(EnumType.STRING)   // ← tells Hibernate to store as text not number
    @Column(name = "id_proof")
    private UserIdProof idProof;
}