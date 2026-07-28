package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.SignIn.SignInRequestDTO;
import com.orra.Orrabackend.dto.SignIn.SignInResponseDTO;
import com.orra.Orrabackend.service.SignInService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/signin")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SignInController {

    @Autowired
    private SignInService signInService;

    @PostMapping
    public SignInResponseDTO signIn(@RequestBody SignInRequestDTO dto,
                                    HttpServletRequest request) {

        SignInResponseDTO response = signInService.signIn(dto);

        HttpSession session = request.getSession(true);
        session.setAttribute("userId", response.getUserId());

        return response;
    }

    @PostMapping("/logout")
    public Map<String, String> logout(HttpSession session) {

        session.invalidate();

        return Collections.singletonMap("message", "Logout Successful");
    }
}