package com.orra.Orrabackend.dto.SignIn;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignInResponseDTO {

    private Long userId;
    private String name;
    private String message;

}