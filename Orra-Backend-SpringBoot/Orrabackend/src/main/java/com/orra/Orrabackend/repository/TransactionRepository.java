package com.orra.Orrabackend.repository;

import com.orra.Orrabackend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("""
            SELECT COALESCE(SUM(t.amount), 0)
            FROM Transaction t
            WHERE t.bookingId IN :bookingIds
            """)
    Double getTotalEarnings(@Param("bookingIds") List<Long> bookingIds);

    List<Transaction> findByBookingId(Long bookingId);
}