package com.orra.Orrabackend.dto.UserProfile;

import lombok.Data;

@Data
public class UpdateUserProfileRequestDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String location;
    private String bio;

}