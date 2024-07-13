CREATE TABLE IF NOT EXISTS training_plans (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status plan_status_enum NOT NULL,
    cardio INT,
    cardio_type cardio_type_enum,
    notes VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS training_plans ENABLE ROW LEVEL SECURITY;