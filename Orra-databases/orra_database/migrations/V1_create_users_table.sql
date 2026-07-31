CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    fullname VARCHAR(100) NOT NULL,

    username VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    phone VARCHAR(15),

    password VARCHAR(255) NOT NULL,

    profile_pic VARCHAR(255),

    address TEXT,

    -- Supabase Auth User ID
    supabase_id UUID UNIQUE NOT NULL,

    id_proof id_proof_enum NOT NULL,

    pan_number VARCHAR(20),

    aadhaar_number VARCHAR(20),

    is_verified BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT id_proof_validation CHECK (
        (id_proof = 'PAN' AND pan_number IS NOT NULL AND aadhaar_number IS NULL)
        OR
        (id_proof = 'AADHAAR' AND aadhaar_number IS NOT NULL AND pan_number IS NULL)
        OR
        (id_proof = 'BOTH' AND pan_number IS NOT NULL AND aadhaar_number IS NOT NULL)
    )
);


CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role app_user_role_enum NOT NULL,

    PRIMARY KEY (user_id, role),

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);