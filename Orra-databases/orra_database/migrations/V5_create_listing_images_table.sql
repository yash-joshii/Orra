CREATE TABLE listing_images (
  image_id bigint NOT NULL DEFAULT nextval('listing_images_image_id_seq'::regclass),
  listing_id bigint NOT NULL,
  image_url text NOT NULL,
  is_cover boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image_data text,
  CONSTRAINT listing_images_pkey PRIMARY KEY (image_id),
  CONSTRAINT listing_images_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listings(product_id)
);