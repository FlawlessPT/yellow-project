CREATE TABLE IF NOT EXISTS subscription_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    duration INT NOT NULL,
    price NUMERIC(6,2) NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    UNIQUE (name, duration)
);

ALTER TABLE IF EXISTS subscription_types ENABLE ROW LEVEL SECURITY;