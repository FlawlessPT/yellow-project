CREATE TABLE IF NOT EXISTS supplement_plans (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    status plan_status_enum NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS supplement_plans ENABLE ROW LEVEL SECURITY;