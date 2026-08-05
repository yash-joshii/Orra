package com.orra.Orrabackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSubscriptionEmail(String toEmail) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject("Welcome to ORRA!");

        message.setText(
                "Hello,\n\n" +
                        "Thank you for subscribing to ORRA.\n\n" +
                        "You will now receive updates regarding new products, offers and exciting features.\n\n" +
                        "Regards,\n" +
                        "Team ORRA"
        );

        mailSender.send(message);
    }
@Async
    public void sendNewListingEmail(String toEmail, String productName) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject("New Product Listed on ORRA");

        message.setText(
                "Hello,\n\n" +
                        "A new product has just been listed on ORRA.\n\n" +
                        "Product: " + productName + "\n\n" +
                        "Visit ORRA to check it out before someone else rents it!\n\n" +
                        "Regards,\n" +
                        "Team ORRA"
        );

        mailSender.send(message);
    }
}