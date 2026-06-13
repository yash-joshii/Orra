// UserController.java
package com.orra.Orrabackend.controller;
import com.orra.Orrabackend.dto.signup.SignupRequestDTO;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private final UserService service;
    public UserController(UserService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(service.create(user));
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignupRequestDTO dto) {
        return ResponseEntity.ok(service.signup(dto));
    }
}