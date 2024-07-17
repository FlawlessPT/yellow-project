CREATE TABLE IF NOT EXISTS daily_updates (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    recovery_level INT,
    energy INT,
    steps INT,
    training_performance INT,
    training_area VARCHAR(50),
    sleep_hours VARCHAR(6),
    weight NUMERIC(5,2),
    digestion INT,
    notes VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS daily_updates ENABLE ROW LEVEL SECURITY;