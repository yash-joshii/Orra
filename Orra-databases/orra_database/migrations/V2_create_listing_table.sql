CREATE TABLE listings (
    product_id SERIAL PRIMARY KEY,

    owner_id INT REFERENCES users(user_id) ON DELETE CASCADE,

    serial_or_imei VARCHAR(100) UNIQUE,

    category VARCHAR(100) NOT NULL,

    title VARCHAR(200) NOT NULL,

    brand VARCHAR(100),

    model VARCHAR(100),

    purchase_price DECIMAL(10,2),

    daily_rate DECIMAL(10,2) NOT NULL,

    security_deposit DECIMAL(10,2) NOT NULL,

    health_score INT CHECK (health_score BETWEEN 1 AND 100),

    location VARCHAR(150),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);