// UserController.java
package com.orra.Orrabackend.controller;
import com.orra.Orrabackend.Entity.User;
import com.orra.Orrabackend.model.UserDetails;
import com.orra.Orrabackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    public UserController(UserService service) { this.service = service; }

    @GetMapping("/admin/getDetails")
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping("/public/createUser")
    public ResponseEntity<String> create(@RequestBody UserDetails user) {
        return ResponseEntity.ok(service.create(user));
    }
}

