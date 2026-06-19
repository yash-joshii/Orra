CREATE TABLE listing_images (
    image_id SERIAL PRIMARY KEY,
    listing_id INT NOT NULL REFERENCES listings(product_id) ON DELETE CASCADE,    -- Delete images automatically if listing is deleted
    image_data TEXT NOT NULL,  -- Base64-encoded image string (sent from React, no size limit)
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,    
    display_order INT NOT NULL DEFAULT 0,  -- Controls gallery order (0, 1, 2, 3...)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);