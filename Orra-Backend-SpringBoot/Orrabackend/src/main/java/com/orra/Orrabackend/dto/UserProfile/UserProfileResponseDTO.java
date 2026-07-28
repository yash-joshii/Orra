package com.orra.Orrabackend.dto.UserProfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponseDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;

}