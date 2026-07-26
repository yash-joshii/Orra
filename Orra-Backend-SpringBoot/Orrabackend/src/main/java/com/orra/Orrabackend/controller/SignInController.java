package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.SignIn.SignInRequestDTO;
import com.orra.Orrabackend.dto.SignIn.SignInResponseDTO;
import com.orra.Orrabackend.service.SignInService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signin")
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
}