CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,

    booking_id INT REFERENCES bookings(booking_id) ON DELETE CASCADE,

    amount DECIMAL(10,2) NOT NULL,

    type transaction_type_enum NOT NULL,

    status transaction_status_enum NOT NULL,

    payment_gateway_ref VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);