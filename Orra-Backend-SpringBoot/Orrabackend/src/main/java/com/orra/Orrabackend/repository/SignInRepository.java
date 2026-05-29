package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignInRepository extends JpaRepository<User, String> {
}
