
-- Index of Table does not start with 0 So run the TRUNCATE command first   
-- RESTART IDENTITY COMMAND RESETS PostgreSQL index count to Zero 
-- Execute commands in this order only 

TRUNCATE TABLE listing_images RESTART IDENTITY CASCADE;
TRUNCATE TABLE reviews RESTART IDENTITY CASCADE;
TRUNCATE TABLE transactions RESTART IDENTITY CASCADE;
TRUNCATE TABLE bookings RESTART IDENTITY CASCADE;
TRUNCATE TABLE listings RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;


-- Safe Reset of Tables 

DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS listing CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS listing_images CASCADE;

DROP TYPE IF EXISTS user_role_enum;
DROP TYPE IF EXISTS id_proof_enum;
DROP TYPE IF EXISTS booking_status_enum;
DROP TYPE IF EXISTS transaction_type_enum;
DROP TYPE IF EXISTS transaction_status_enum;


-- V0 ENUM CREATION 

CREATE TYPE user_role_enum AS ENUM(
    'OWNER',
    'RENTER',
    'BOTH'
);

CREATE TYPE id_proof_enum AS ENUM(
    'PAN',
    'AADHAAR',
    'BOTH',
    'NONE'
);

CREATE TYPE booking_status-enum AS ENUM(
    'PENDING',
    'CONFIRMED',
    'ACTIVE',
    'COMPLETED',
    'DISPUTED',
    'CANCELLED'
);

CREATE TYPE transaction_type_enum AS ENUM(
    'RENTAL PAYMENT',
    'DEPOSIT HOLD',
    'DEPOSIT REFUND',
    'REFUND'
);

CREATE TYPE transaction_status_enum AS ENUM(
    'PENDING',
    'SUCCESS',
    'FAILED'
);


-- V1 USER TABLE CREATION 

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255),
    address TEXT,
    role user_role_enum NOT NULL,
    id_proof id_proof_enum NOT NULL,

    pan_number VARCHAR(20),
    aadhaar_number VARCHAR(20),

    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_id_proof_consistency CHECK(
        (id_proof = 'PAN' and pan_number IS NOT NULL AND aadhaar_number IS NULL)
        OR
        (id_proof = 'AADHAAR' and aadhaar_number IS NOT NULL AND pan_number IS NULL)
        OR
        (id_proof = 'BOTH' and pan_number IS NOT NULL AND aadhaar_number IS NOT NULL)
    )
);


-- V2 LISTING TABLE CREATION

CREATE TABLE listings(
    product_id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    serial_or_imei VARCHAR(100) UNIQUE,            
    category VARCHAR(100) NOT NULL,         
    title VARCHAR(200) NOT NULL,
    brand VARCHAR(100),
    model VARCHAR(100),
    purchase_price DECIMAL(10,2),                    
    daily_rate DECIMAL(10,2) NOT NULL,
    security_deposit DECIMAL(10,2) NOT NULL,

    health_score INT DEFAULT 100 CHECK(health_score BETWEEN 1 AND 100),

    location VARCHAR(150),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_daily_rate CHECK(daily > 0),
    CONSTRAINT chk_security_deposit CHECK(security_deposit >= 0)

);

-- V3 BOOKING TABLE CREATION

CREATE TABLE bookings(
    booking_id SERIAL PRIMARY KEY,
    listing_id INT NOT NULL REFERENCES listings(product_id) ON DELETE RESTRICT, -- Cannot delete a listed product with active bookings
    renter_id INT NOT NUL REFERENCES users(user_id) ON DELETE RESTRICT, -- Cannot delete a user with booking history

    start_datetime TIMESTAMP NOT NULL,
    end_datetime TIMESTAMP NOT NULL,

    total_price DECIMAL(10, 2),
    deposit_amount DECIMAL(10, 2),

    status booking_status_enum NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_booking_dates CHECK(end_datetime > start_datetime)
);

-- V4 TRANSACTION TABLE CREATION

CREATE TABLE transactions(
    transaction_id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL REFERENCES bookings(booking_id) ON DELETE RESTRICT,

    amount DECIMAL(10, 2) NOT NULL,
    type transaction_type_enum NOT NULL,
    status transaction_status_enum NOT NULL DEFAULT 'PENDING',

    payment_gateway_ref VARCHAR(255),

    created_at TIMESTAMP NOT NULL CURRENT_TIMESTAMP,
    CONSTRAINT chk_txn_amount CHECK(amount > 0)
);


-- V5 LISTING IMAGE TABLE CREATION

CREATE TABLE listing_images (
    image_id SERIAL PRIMARY KEY,
    listing_id INT NOT NULL REFERENCES listings(product_id) ON DELETE CASCADE,    -- Delete images automatically if listing is deleted
    image_data TEXT NOT NULL,  -- Base64-encoded image string (sent from React, no size limit)
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,    
    display_order INT NOT NULL DEFAULT 0,  -- Controls gallery order (0, 1, 2, 3...)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);