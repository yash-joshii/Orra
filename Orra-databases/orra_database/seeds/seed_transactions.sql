INSERT INTO transactions (
    booking_id, amount, type, status, payment_gateway_ref
) VALUES

-- Booking 1
(1, 6000, 'rental_payment', 'success', 'TXN12345'),
(1, 10000, 'deposit_hold', 'success', 'TXN12346'),

-- Booking 2
(2, 1600, 'rental_payment', 'success', 'TXN22345'),
(2, 5000, 'deposit_hold', 'success', 'TXN22346'),

-- Booking 3 (failed payment)
(3, 3600, 'rental_payment', 'failed', 'TXN32345'),

-- Booking 4 (completed + refund)
(4, 4000, 'rental_payment', 'success', 'TXN42345'),
(4, 12000, 'deposit_refund', 'success', 'TXN42346');