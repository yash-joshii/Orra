package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignInRepository extends JpaRepository<User, Long> {
    User findByname(String name);
}