CREATE TABLE transactions (
  transaction_id bigint NOT NULL DEFAULT nextval('transactions_transaction_id_seq'::regclass),
  booking_id bigint,
  amount double precision NOT NULL,
  type character varying NOT NULL,
  status character varying NOT NULL,
  payment_gateway_ref character varying,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id),
  CONSTRAINT transactions_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(booking_id)
);