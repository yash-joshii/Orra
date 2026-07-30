package com.orra.Orrabackend.messaging;

import com.orra.Orrabackend.dto.messages.BookingConfirmedMessage;
import com.orra.Orrabackend.dto.messages.PaymentSuccessMessage;
import com.orra.Orrabackend.service.bookingService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class PaymentSuccessConsumer {

    private final RabbitMQPublisher rabbitMQPublisher;
    private  final bookingService bookingservice;
    public PaymentSuccessConsumer(RabbitMQPublisher rabbitMQPublisher, bookingService bookingservice) {
        this.rabbitMQPublisher = rabbitMQPublisher;
        this.bookingservice = bookingservice;
    }

    @RabbitListener(queues = "${app.rabbitmq.payment-success-queue}")
    public void handlePaymentSuccess(PaymentSuccessMessage message) {
        System.out.println("[PaymentSuccessConsumer] Received: " + message.getTransactionId());

        BookingConfirmedMessage response = new BookingConfirmedMessage();
        response.setTransactionId(message.getTransactionId());
        response.setBookingId(message.getBookingId());
        try {
            bookingservice.payForBooking(message.getBookingId());

            response.setStatus("CONFIRMED");
            response.setReason(null);

        response.setStatus("CONFIRMED");
        response.setReason(null);

    } catch (Exception ex) {
        response.setStatus("BOOKING_FAILED");
        response.setReason(ex.getMessage());
            System.out.println("[PaymentSuccessConsumer] Booking failed reason: " + ex.getMessage());
    }

        rabbitMQPublisher.publishBookingConfirmed(response);
        System.out.println("[PaymentSuccessConsumer] Published booking.confirmed: " + response.getStatus());
}
}
