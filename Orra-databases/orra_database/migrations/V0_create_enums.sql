CREATE TYPE app_user_role_enum AS ENUM (
    'BUYER',
    'OWNER',
    'ADMIN'
);

CREATE TYPE id_proof_enum AS ENUM(
    'PAN',
    'AADHAAR',
    'BOTH',
    'NONE'
);

CREATE TYPE booking_status-enum AS ENUM(
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'PAID',
    'SHIPPED',
    'COMPLETED',
    'REFUNDED',
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

CREATE TYPE category_enum AS ENUM (
    'LAPTOP',
    'CAMERA',
    'GAMING_CONSOLES',
    'DRONES',
    'MOBILE',
    'SMART_WATCHES',
    'AUDIO_DEVICES',
    'MONITORS',
    'VR_AR',
    'LENSES',
    'LIGHTING',
    'ACTION_CAMERAS',
    'PROJECTORS',
    'MICROPHONES',
    'TABLETS',
    'ACCESSORIES',
    'REFRIGERATOR',
    'TV'
);