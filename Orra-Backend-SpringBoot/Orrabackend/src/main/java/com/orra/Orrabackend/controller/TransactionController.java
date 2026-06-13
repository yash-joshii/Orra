package com.orra.Orrabackend.controller;

import com.orra.Orrabackend.dto.transaction.TransactionRequestDTO;
import com.orra.Orrabackend.model.Transaction;
import com.orra.Orrabackend.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/transactions")

public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // CREATE TRANSACTION

    @PostMapping

    public Transaction createTransaction(
            @RequestBody
            TransactionRequestDTO dto) {

        return transactionService
                .createTransaction(dto);
    }

    // GET TRANSACTION BY ID

    @GetMapping("/{id}")

    public Transaction getTransactionById(
            @PathVariable Long id) {

        return transactionService
                .getTransactionById(id);
    }

    // GET TRANSACTIONS BY BOOKING ID

    @GetMapping("/booking/{id}")

    public List<Transaction>
    getTransactionsByBookingId(
            @PathVariable Long id) {

        return transactionService
                .getTransactionsByBookingId(id);
    }

    // REFUND TRANSACTION

    @PostMapping("/{id}/refund")

    public Transaction refundTransaction(
            @PathVariable Long id) {

        return transactionService
                .refundTransaction(id);
    }
}