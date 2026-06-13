package com.orra.Orrabackend.service;

import com.orra.Orrabackend.dto.SignIn.SignInRequestDTO;
import com.orra.Orrabackend.dto.SignIn.SignInResponseDTO;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.SignInRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignInService {
    @Autowired
    private SignInRepository signInRepository;

    public SignInResponseDTO SignIn(SignInRequestDTO dto) {
        User user = signInRepository.findByUsername(dto.getUsername());
        if (user == null) {
            throw new RuntimeException("username not found");
        }

        if (!user.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException("password not match");
        }

        return new SignInResponseDTO(
                user.getName(),
                "login successful"
        );
    }

}
