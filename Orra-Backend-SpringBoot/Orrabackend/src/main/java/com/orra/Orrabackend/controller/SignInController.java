package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.SignIn.SignInRequestDTO;
import com.orra.Orrabackend.dto.SignIn.SignInResponseDTO;
import com.orra.Orrabackend.service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/signin")
public class SignInController {

    @Autowired
    public SignInService signInService;

    @PostMapping
    public SignInResponseDTO SignIn(@RequestBody SignInRequestDTO dto){
        return signInService.SignIn(dto);
    }

}
