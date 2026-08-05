package com.orra.Orrabackend.service;

import com.orra.Orrabackend.dto.signup.SignupRequestDTO;
import com.orra.Orrabackend.enums.UserIdProof;
import com.orra.Orrabackend.enums.UserRole;
import com.orra.Orrabackend.exception.UserNotFoundException;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;


@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAll() {
        return repo.findAll();
    }

    public User create(User user) {
        return repo.save(user);
    }

    public User getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public void grantOwnerRole(Long userId) {

        User user = repo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        if (!user.getRoles().contains(UserRole.OWNER)) {
            user.getRoles().add(UserRole.OWNER);
            repo.save(user);
        }
    }

    public User signup(SignupRequestDTO dto) {
        UUID supabaseUuid = UUID.fromString(dto.getSupabaseUserId());

        // Idempotent — return existing user for returning OAuth users
        Optional<User> existing = repo.findBySupabaseId(supabaseUuid);
        if (existing.isPresent()) {
            return existing.get();
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        // phone is optional for OAuth providers (Google/Apple)
        user.setPhone(dto.getPhone() != null ? dto.getPhone() : "");
        user.setSupabaseId(supabaseUuid);
        user.setRoles(new HashSet<>(Set.of(UserRole.BUYER)));
        user.setAddress("NA");
        user.setIdProof(UserIdProof.NONE);

        return repo.save(user);
    }
}