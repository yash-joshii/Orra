package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.enums.UserRole;
import com.orra.Orrabackend.model.User;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findByPhone(String phone);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    Optional<User> findBySupabaseId(UUID supabaseId); // NEW

    @Query("""
    SELECT u FROM User u
    WHERE (:role IS NULL OR :role MEMBER OF u.roles)
    AND (:status IS NULL OR u.status = :status)
    """)
    Page<User> findAllFiltered(@Param("role") UserRole role,
                               @Param("status") String status,
                               Pageable pageable);

    List<User> findBySubscribedTrue();
}