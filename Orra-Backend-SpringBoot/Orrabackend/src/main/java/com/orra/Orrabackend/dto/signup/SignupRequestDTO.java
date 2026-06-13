package com.orra.Orrabackend.dto.signup;

import lombok.Data;

@Data
public class SignupRequestDTO {
    private String username;
    private String name;
    private String email;
    private String password;
}
