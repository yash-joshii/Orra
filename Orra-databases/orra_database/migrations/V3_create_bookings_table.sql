CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,

    listing_id INT REFERENCES listings(product_id) ON DELETE CASCADE,

    renter_id INT REFERENCES users(user_id) ON DELETE CASCADE,

    start_datetime TIMESTAMP NOT NULL,

    end_datetime TIMESTAMP NOT NULL,

    total_price DECIMAL(10,2),

    deposit_amount DECIMAL(10,2),

    status booking_status_enum NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);