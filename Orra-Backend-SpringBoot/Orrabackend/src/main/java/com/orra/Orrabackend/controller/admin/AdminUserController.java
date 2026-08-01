package com.orra.Orrabackend.controller.admin;


import com.orra.Orrabackend.dto.admin.AdminUserDTO;
import com.orra.Orrabackend.enums.UserRole;
import com.orra.Orrabackend.service.admin.AdminUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
@AllArgsConstructor
public class AdminUserController {
    private final AdminUserService adminUserService;

    @GetMapping
    public ResponseEntity<Page<AdminUserDTO>> getUsers(
            @RequestParam(required = false) UserRole role,
            @RequestParam(required = false) String status,
            @PageableDefault(size = 10) Pageable pageable) {
        return ResponseEntity.ok(adminUserService.getUsers(role, status, pageable));
    }

    @PatchMapping("/{id}/verify")
    public ResponseEntity<Void> verify(@PathVariable Long id) {
        adminUserService.verifyUser(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/block")
    public ResponseEntity<Void> block(@PathVariable Long id) {
        adminUserService.blockUser(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/unblock")
    public ResponseEntity<Void> unblock(@PathVariable Long id) {
        adminUserService.unblockUser(id);
        return ResponseEntity.ok().build();
    }
}
