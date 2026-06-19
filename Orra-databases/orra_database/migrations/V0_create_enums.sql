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
