package com.orra.Orrabackend.model;

import com.orra.Orrabackend.enums.UserIdProof;
import com.orra.Orrabackend.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String phone;

//    @Column(nullable = false)
//    private String password;

    @Column(name = "avatar")
    private String avatar;

    private String address;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Set<UserRole> roles = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "id_proof")
    private UserIdProof idProof;

    @Column(name = "supabase_id", unique = true, nullable = false)
    private UUID supabaseId;

    @Column(nullable = false)
    private boolean verified = false;

    @Column(nullable = false)
    private String status = "ACTIVE";

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "subscribed", nullable = false)
    private Boolean subscribed = false;
}