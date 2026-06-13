//// TransactionController.java
//package com.orra.Orrabackend.controller;
//import com.orra.Orrabackend.model.Transaction;
//import com.orra.Orrabackend.service.TransactionService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/transactions")
//public class TransactionController {
//    private final TransactionService service;
//    public TransactionController(TransactionService service) { this.service = service; }
//
//    @GetMapping
//    public ResponseEntity<List<Transaction>> getAll() {
//        return ResponseEntity.ok(service.getAll());
//    }
//
//    @PostMapping
//    public ResponseEntity<Transaction> create(@RequestBody Transaction transaction) {
//        return ResponseEntity.ok(service.create(transaction));
//    }
//}