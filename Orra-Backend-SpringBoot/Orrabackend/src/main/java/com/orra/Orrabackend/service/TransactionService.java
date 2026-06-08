package com.orra.Orrabackend.service;

import com.orra.Orrabackend.dto.transaction.TransactionRequestDTO;
import com.orra.Orrabackend.model.Transaction;
import com.orra.Orrabackend.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service

public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // CREATE TRANSACTION

    public Transaction createTransaction(
            TransactionRequestDTO dto) {

        Transaction transaction =
                new Transaction();

        transaction.setBookingId(
                dto.getBookingId());

        transaction.setAmount(
                dto.getAmount());

        transaction.setType(
                dto.getType());

        transaction.setStatus(
                dto.getStatus());

        transaction.setPaymentGatewayRef(
                dto.getPaymentGatewayRef());

        transaction.setCreatedAt(
                LocalDateTime.now());

        return transactionRepository
                .save(transaction);
    }

    // GET TRANSACTION BY ID

    public Transaction getTransactionById(
            Long id) {

        return transactionRepository
                .findById(id)
                .orElse(null);
    }

    // GET TRANSACTIONS BY BOOKING ID

    public List<Transaction>
    getTransactionsByBookingId(
            Long bookingId) {

        return transactionRepository
                .findByBookingId(bookingId);
    }

    // REFUND TRANSACTION

    public Transaction refundTransaction(
            Long id) {

        Transaction transaction =
                transactionRepository
                        .findById(id)
                        .orElse(null);

        if(transaction != null) {

            transaction.setStatus(
                    "REFUNDED");

            transactionRepository
                    .save(transaction);
        }

        return transaction;
    }
}