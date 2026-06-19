CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    fullname VARCHAR(100) NOT NULL,

    username VARCHAR(100) NOT NULL,

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

