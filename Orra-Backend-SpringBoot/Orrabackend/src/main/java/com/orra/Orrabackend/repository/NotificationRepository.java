package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.model.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {
    List<Notifications> findByUser_IdOrderByCreatedAtDesc(Long userId);
    long countByUser_IdAndIsReadFalse(Long userId);
}
