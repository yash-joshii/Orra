------enums---------

CREATE TYPE user_role_enum AS ENUM ('owner', 'renter', 'both');

CREATE TYPE id_proof_enum AS ENUM ('PAN', 'AADHAAR', 'both');

CREATE TYPE booking_status_enum AS ENUM 
('pending', 'confirmed', 'active', 'completed', 'disputed', 'cancelled');

CREATE TYPE transaction_type_enum AS ENUM 
('rental_payment', 'deposit_hold', 'deposit_refund', 'refund');

CREATE TYPE transaction_status_enum AS ENUM 
('pending', 'success', 'failed');


---users------------

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    phone VARCHAR(15),

    password VARCHAR(255) NOT NULL,

    profile_pic VARCHAR(255),

    address TEXT,

    role user_role_enum NOT NULL,

    id_proof id_proof_enum NOT NULL,

    -- Actual ID numbers
    pan_number VARCHAR(20),
    aadhaar_number VARCHAR(20),

    is_verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Validation logic
    CHECK (
        (id_proof = 'PAN' AND pan_number IS NOT NULL AND aadhaar_number IS NULL)
        OR
        (id_proof = 'AADHAAR' AND aadhaar_number IS NOT NULL AND pan_number IS NULL)
        OR
        (id_proof = 'both' AND pan_number IS NOT NULL AND aadhaar_number IS NOT NULL)
    )
);

--------listing--------

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


-----booking------

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
