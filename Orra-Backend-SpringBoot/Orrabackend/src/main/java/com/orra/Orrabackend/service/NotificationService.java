package com.orra.Orrabackend.service;

import com.orra.Orrabackend.dto.notification.NotificationResponseDTO;
import com.orra.Orrabackend.model.Booking;
import com.orra.Orrabackend.model.Notifications;
import com.orra.Orrabackend.model.User;
import com.orra.Orrabackend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public Notifications createNotification(User user, Booking booking, String message, String type){
        Notifications notification = new Notifications();
        notification.setUser(user);
        notification.setBooking(booking);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);
        notification.setCreatedAt(Instant.now());
        return notificationRepository.save(notification);
    }

    public List<NotificationResponseDTO> getUserNotifications(Long userId) {
        return notificationRepository.findByUser_IdOrderByCreatedAtDesc(userId)
                .stream()
                .map(notification -> new NotificationResponseDTO(
                        notification.getId(),
                        notification.getMessage(),
                        notification.getType(),
                        notification.isRead(),
                        notification.getCreatedAt()
                ))
                .toList();
    }

    public long getUnreadCount(Long userId){
        return notificationRepository.countByUser_IdAndIsReadFalse(userId);
    }

    public NotificationResponseDTO markAsRead(Long notificationId){
        Notifications notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification Not Found"));
        notification.setRead(true);
        notification = notificationRepository.save(notification);
        
        return new NotificationResponseDTO(
                notification.getId(),
                notification.getMessage(),
                notification.getType(),
                notification.isRead(),
                notification.getCreatedAt()
        );
    }


}
