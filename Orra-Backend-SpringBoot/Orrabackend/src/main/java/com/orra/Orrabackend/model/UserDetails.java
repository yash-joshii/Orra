package com.orra.Orrabackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {
    private Integer userId;
    private String name;
    private String email;
    private String phone;
    private String password;
    private String profilePic;
    private String address;
    private String role;
    private String idProof;
    private String panNumber;
    private String aadhaarNumber;
    private Boolean isVerified;
    private Instant createdAt;
}
