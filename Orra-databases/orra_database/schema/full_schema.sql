
-- Index of Table does not start with 0 So run the TRUNCATE command first   
-- RESTART IDENTITY COMMAND RESETS PostgreSQL index count to Zero 
-- Execute commands in this order only 

TRUNCATE TABLE wishlist RESTART IDENTITY CASCADE;
TRUNCATE TABLE notifications RESTART IDENTITY CASCADE;
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
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS wishlist CASCADE;

DROP TYPE IF EXISTS user_role_enum;
DROP TYPE IF EXISTS id_proof_enum;
DROP TYPE IF EXISTS booking_status_enum;
DROP TYPE IF EXISTS transaction_type_enum;
DROP TYPE IF EXISTS transaction_status_enum;


-- V0 ENUM CREATION 

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


-- V1 USER TABLE CREATION 

CREATE TABLE users (
  user_id bigint NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
  name character varying NOT NULL,
  email character varying NOT NULL UNIQUE,
  phone character varying,
  profile_pic character varying,
  address character varying,
  pan_number character varying,
  aadhaar_number character varying,
  is_verified boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  username character varying,
  id_proof character varying,
  supabase_id uuid UNIQUE,
  status character varying NOT NULL DEFAULT 'ACTIVE'::character varying,
  verified boolean NOT NULL DEFAULT false,
  avatar character varying,
  subscribed boolean NOT NULL DEFAULT false,
  CONSTRAINT users_pkey PRIMARY KEY (user_id)
);


-- V2 LISTING TABLE CREATION

CREATE TABLE listings (
  product_id bigint NOT NULL DEFAULT nextval('listings_product_id_seq'::regclass),
  owner_id bigint,
  serial_or_imei character varying UNIQUE,
  brand character varying,
  model character varying,
  purchase_price numeric,
  daily_rate numeric NOT NULL,
  security_deposit numeric NOT NULL,
  health_score integer CHECK (health_score >= 1 AND health_score <= 100),
  location character varying,
  is_active boolean DEFAULT true,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  days integer,
  description character varying,
  product_name character varying,
  category character varying,
  productspec jsonb,
  available_from date,
  available_to date,
  maximum_rental_days integer,
  minimum_rental_days integer,
  purchase_year integer,
  is_available boolean NOT NULL DEFAULT true,
  approval_status character varying NOT NULL DEFAULT 'PENDING'::character varying,
  CONSTRAINT listings_pkey PRIMARY KEY (product_id),
  CONSTRAINT listings_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES .users(user_id)
);

-- V3 BOOKING TABLE CREATION

CREATE TABLE bookings (
  booking_id bigint NOT NULL DEFAULT nextval('bookings_booking_id_seq'::regclass),
  listing_id bigint,
  renter_id bigint,
  start_datetime date NOT NULL,
  end_datetime date NOT NULL,
  total_price numeric,
  deposit_amount numeric,
  status character varying NOT NULL DEFAULT 'pending'::booking_status_enum,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  accepted_at timestamp with time zone,
  completed_at timestamp with time zone,
  paid_at timestamp with time zone,
  shipped_at timestamp with time zone,
  CONSTRAINT bookings_pkey PRIMARY KEY (booking_id),
  CONSTRAINT bookings_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES .listings(product_id),
  CONSTRAINT bookings_renter_id_fkey FOREIGN KEY (renter_id) REFERENCES .users(user_id)
);

-- V4 TRANSACTION TABLE CREATION

CREATE TABLE transactions (
  transaction_id bigint NOT NULL DEFAULT nextval('transactions_transaction_id_seq'::regclass),
  booking_id bigint,
  amount double precision NOT NULL,
  type character varying NOT NULL,
  status character varying NOT NULL,
  payment_gateway_ref character varying,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id),
  CONSTRAINT transactions_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES .bookings(booking_id)
);


-- V5 LISTING IMAGE TABLE CREATION

CREATE TABLE listing_images (
  image_id bigint NOT NULL DEFAULT nextval('listing_images_image_id_seq'::regclass),
  listing_id bigint NOT NULL,
  image_url text NOT NULL,
  is_cover boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image_data text,
  CONSTRAINT listing_images_pkey PRIMARY KEY (image_id),
  CONSTRAINT listing_images_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES .listings(product_id)
);
-- V6 NOTIFICATION TABLE CREATION

CREATE TABLE notifications (
  id bigint NOT NULL DEFAULT nextval('notifications_id_seq'::regclass),
  user_id bigint NOT NULL,
  booking_id bigint,
  message text NOT NULL,
  type character varying NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES .users(user_id),
  CONSTRAINT notifications_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES .bookings(booking_id)
);
--V7 WHISLIST TABLE CREATION

CREATE TABLE wishlist (
  wishlist_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  added_at timestamp without time zone,
  product_id bigint,
  user_id bigint,
  CONSTRAINT wishlist_pkey PRIMARY KEY (wishlist_id),
  CONSTRAINT fke0d9j8grqwrdfeo8as6p5qdqk FOREIGN KEY (product_id) REFERENCES .listings(product_id),
  CONSTRAINT fktrd6335blsefl2gxpb8lr0gr7 FOREIGN KEY (user_id) REFERENCES .users(user_id)
);


--V8 USER ROLE CREATION

CREATE TABLE user_roles (
  user_id bigint NOT NULL,
  role character varying NOT NULL,
  CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role),
  CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES .users(user_id)
);