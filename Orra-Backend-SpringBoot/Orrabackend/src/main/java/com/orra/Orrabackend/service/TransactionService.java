//// TransactionService.java
//package com.orra.Orrabackend.service;
//import com.orra.Orrabackend.model.Transaction;
//import com.orra.Orrabackend.repository.TransactionRepository;
//import org.springframework.stereotype.Service;
//import java.util.List;
//
//@Service
//public class TransactionService {
//    private final TransactionRepository repo;
//    public TransactionService(TransactionRepository repo) { this.repo = repo; }
//
//    public List<Transaction> getAll() { return repo.findAll(); }
//    public Transaction create(Transaction transaction) { return repo.save(transaction); }
//}