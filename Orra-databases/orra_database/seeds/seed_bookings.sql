INSERT INTO bookings (
    listing_id, renter_id, start_datetime, end_datetime,
    total_price, deposit_amount, status
) VALUES

-- Rahul rents MacBook
(1, 2, '2025-06-01 10:00:00', '2025-06-05 10:00:00',
6000, 10000, 'confirmed'),

-- Sneha rents Camera
(2, 3, '2025-06-10 09:00:00', '2025-06-12 09:00:00',
1600, 5000, 'active'),

-- Amit rents PS5
(3, 4, '2025-06-15 12:00:00', '2025-06-18 12:00:00',
3600, 7000, 'pending'),

-- Rahul rents Drone
(4, 2, '2025-06-20 08:00:00', '2025-06-22 08:00:00',
4000, 12000, 'completed');