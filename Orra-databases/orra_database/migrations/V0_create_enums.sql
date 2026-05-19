CREATE TYPE user_role_enum AS ENUM ('owner', 'renter', 'both');

CREATE TYPE id_proof_enum AS ENUM ('PAN', 'AADHAAR', 'both');

CREATE TYPE booking_status_enum AS ENUM 
('pending', 'confirmed', 'active', 'completed', 'disputed', 'cancelled');

CREATE TYPE transaction_type_enum AS ENUM 
('rental_payment', 'deposit_hold', 'deposit_refund', 'refund');

CREATE TYPE transaction_status_enum AS ENUM 
('pending', 'success', 'failed');