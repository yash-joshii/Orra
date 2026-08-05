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
  CONSTRAINT bookings_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(product_id),
  CONSTRAINT bookings_renter_id_fkey FOREIGN KEY (renter_id) REFERENCES public.users(user_id)
);