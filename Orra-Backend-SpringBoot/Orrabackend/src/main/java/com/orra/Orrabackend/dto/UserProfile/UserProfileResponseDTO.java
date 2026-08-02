package com.orra.Orrabackend.dto.UserProfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.orra.Orrabackend.enums.UserRole;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponseDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;

    private Set<UserRole> roles;
}