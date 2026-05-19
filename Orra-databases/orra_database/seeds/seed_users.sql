INSERT INTO users (
    name, email, phone, password, profile_pic, address,
    role, id_proof, pan_number, aadhaar_number, is_verified
) VALUES

-- Owner with PAN only
('Yash Sharma', 'yash@gmail.com', '9876543210', 'hashed_pass',
NULL, 'Mumbai, India',
'owner', 'PAN', 'ABCDE1234F', NULL, TRUE),

-- Renter with Aadhaar only
('Rahul Verma', 'rahul@gmail.com', '9123456780', 'hashed_pass',
NULL, 'Delhi, India',
'renter', 'AADHAAR', NULL, '123412341234', TRUE),

-- Both roles with both IDs
('Sneha Patel', 'sneha@gmail.com', '9988776655', 'hashed_pass',
NULL, 'Ahmedabad, India',
'both', 'both', 'PQRSX5678L', '567856785678', TRUE),

-- Another renter
('Amit Singh', 'amit@gmail.com', '9001122334', 'hashed_pass',
NULL, 'Bangalore, India',
'renter', 'AADHAAR', NULL, '789078907890', FALSE),

-- Another owner
('Priya Mehta', 'priya@gmail.com', '9112233445', 'hashed_pass',
NULL, 'Pune, India',
'owner', 'PAN', 'LMNOP4321K', NULL, TRUE);