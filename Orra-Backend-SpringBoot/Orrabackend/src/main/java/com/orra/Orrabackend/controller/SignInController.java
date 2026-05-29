package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/SignIn")
public class SignInController {

    @Autowired
    public SignInService signInService;



}
