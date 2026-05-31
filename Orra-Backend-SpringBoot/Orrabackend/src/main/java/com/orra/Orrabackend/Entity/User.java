package com.orra.Orrabackend.Entity;

import com.orra.Orrabackend.enums.id_proof_enum;
import com.orra.Orrabackend.enums.user_role_enum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;

//MODEL Layer — Maps to Supabase Tables

@Entity
@Table(name = "users")
@Setter
@Getter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_id_gen")
    @SequenceGenerator(name = "users_id_gen", sequenceName = "users_user_id_seq", allocationSize = 1)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "profile_pic")
    private String profilePic;

    @Column(name = "address", length = Integer.MAX_VALUE)
    private String address;

    @Column(name = "pan_number", length = 20)
    private String panNumber;

    @Column(name = "aadhaar_number", length = 20)
    private String aadhaarNumber;

    @Column(name = "role", columnDefinition = "user_role_enum not null")
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private user_role_enum role;

    @Column(name = "id_proof", nullable = true)
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    private id_proof_enum idProof;

    @ColumnDefault("false")
    @Column(name = "is_verified")
    private Boolean isVerified;

    //@OneToMany(mappedBy = "renter")
    // private Set<Employee.Booking> bookings = new LinkedHashSet<>();


    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Instant createdAt;
    //@OneToMany(mappedBy = "owner")
    //private Set<Listing> listings = new LinkedHashSet<>();*/

}