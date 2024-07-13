CREATE TABLE IF NOT EXISTS updates (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    weight NUMERIC(5,2) NOT NULL,
    body_fat NUMERIC(5,2),
    lean_mass NUMERIC(5,2),
    front_photo_url VARCHAR(2048) NOT NULL,
    back_photo_url VARCHAR(2048) NOT NULL,
    side_photo_url VARCHAR(2048) NOT NULL,
    notes VARCHAR(2048) NOT NULL,
    feedback VARCHAR(2048),
    status update_status_enum NOT NULL,
    next_update_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS updates ENABLE ROW LEVEL SECURITY;