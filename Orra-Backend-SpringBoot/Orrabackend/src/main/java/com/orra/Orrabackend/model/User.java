package com.orra.Orrabackend.model;
import com.orra.Orrabackend.enums.UserIdProof;
import com.orra.Orrabackend.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Entity;


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
    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private UserRole role;

    @Enumerated(EnumType.STRING)
    @Column(name = "id_proof")
    private UserIdProof idProof;
}