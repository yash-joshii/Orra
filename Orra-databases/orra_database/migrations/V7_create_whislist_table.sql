CREATE TABLE wishlist (
  wishlist_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  added_at timestamp without time zone,
  product_id bigint,
  user_id bigint,
  CONSTRAINT wishlist_pkey PRIMARY KEY (wishlist_id),
  CONSTRAINT fke0d9j8grqwrdfeo8as6p5qdqk FOREIGN KEY (product_id) REFERENCES public.listings(product_id),
  CONSTRAINT fktrd6335blsefl2gxpb8lr0gr7 FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);