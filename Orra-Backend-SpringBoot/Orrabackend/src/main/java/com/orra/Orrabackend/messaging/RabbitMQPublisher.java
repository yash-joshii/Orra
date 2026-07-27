package com.orra.Orrabackend.messaging;

import com.orra.Orrabackend.dto.messages.BookingConfirmedMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${app.rabbitmq.exchange}")
    private String exchangeName;

    @Value("${app.rabbitmq.booking-confirmed-routing-key}")
    private String bookingConfirmedRoutingKey;

    public RabbitMQPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishBookingConfirmed(BookingConfirmedMessage message) {
        rabbitTemplate.convertAndSend(exchangeName, bookingConfirmedRoutingKey, message);
    }

}
