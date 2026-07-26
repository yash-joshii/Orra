// UserService.java
package com.orra.Orrabackend.service;
import com.orra.Orrabackend.dto.signup.SignupRequestDTO;
import com.orra.Orrabackend.enums.UserIdProof;
import com.orra.Orrabackend.enums.UserRole;
import com.orra.Orrabackend.exception.UserNotFoundException;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {
//    @Autowired
    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;
    public UserService(UserRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAll() { return repo.findAll(); }
    public User create(User user) { return repo.save(user); }


    public User getById(Long id){
        return repo.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User signup(SignupRequestDTO dto){
        User user = new User();

        user.setUsername(dto.getUsername());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user.setRole(UserRole.both);   // default
        user.setAddress("NA");    // temporary

        user.setIdProof(UserIdProof.NONE);

        return repo.save(user);
    }
}