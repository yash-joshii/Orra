// UserService.java
package com.orra.Orrabackend.service;
import com.orra.Orrabackend.enums.id_proof_enum;
import com.orra.Orrabackend.enums.user_role_enum;
import com.orra.Orrabackend.Entity.User;
import com.orra.Orrabackend.model.UserDetails;
import com.orra.Orrabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo) { this.repo = repo; }
@Autowired
public PasswordEncoder passwordEncoder;
    public List<User> getAll() {
        return repo.findAll(); }
    public String create(UserDetails userDetailRequest) {
        User user = new User();

        user.setName(userDetailRequest.getName());
        user.setEmail(userDetailRequest.getEmail());
        user.setPhone(userDetailRequest.getPhone());
        user.setPassword(userDetailRequest.getPassword());
        user.setPassword(passwordEncoder.encode(userDetailRequest.getPassword()));
        user.setProfilePic(userDetailRequest.getProfilePic());
        user.setAddress(userDetailRequest.getAddress());

        user.setAadhaarNumber(userDetailRequest.getAadhaarNumber());

        user.setRole(user_role_enum.owner);

        user.setIdProof(id_proof_enum.AADHAAR);

        user.setIsVerified(userDetailRequest.getIsVerified());

        user.setCreatedAt(Instant.now());

        User savedUser = repo.save(user);

        return "Your User id : " + savedUser.getId();

        }
}