//package com.orra.Orrabackend.service;
//
//import com.orra.Orrabackend.dto.SignIn.SignInRequestDTO;
//import com.orra.Orrabackend.dto.SignIn.SignInResponseDTO;
//import com.orra.Orrabackend.model.User;
//import com.orra.Orrabackend.repository.SignInRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class SignInService {
//
//    @Autowired
//    private SignInRepository signInRepository;
//
//    public SignInResponseDTO signIn(SignInRequestDTO dto) {
//
//        System.out.println("==================================");
//        System.out.println("Username Received : " + dto.getUsername());
//        System.out.println("Password Received : '" + dto.getPassword() + "'");
//        System.out.println("==================================");
//
//        // Check for empty email
//        if(dto.getUsername()==null || dto.getUsername().trim().isEmpty()) {
//            throw new RuntimeException("Email is required");
//        }
//
//        // Check for empty password
//        if (dto.getPassword() == null || dto.getPassword().trim().isEmpty()) {
//            throw new RuntimeException("Username is required");
//        }
//
//        // Find user by email
//        User user = signInRepository.findByUsername(dto.getUsername());
//
//        System.out.println("User Found : " + user);
//
//        if (user == null) {
//            throw new RuntimeException("User not found");
//        }
//
//        // Validate password
//        if (!user.getPassword().equals(dto.getPassword())) {
//            throw new RuntimeException("Invalid Password");
//        }
//
//        System.out.println("Login Successful for User ID : " + user.getId());
//
//        return new SignInResponseDTO(
//                user.getId(),
//                user.getName(),
//                "Login Successful"
//        );
//    }
//}