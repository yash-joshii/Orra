package com.orra.Orrabackend.service;

import com.orra.Orrabackend.repository.SignInRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignInService {
    @Autowired
 public SignInRepository signInRepository;


}
