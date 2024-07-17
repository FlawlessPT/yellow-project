CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    subscription_type_id INT,
    status subscription_status_enum NOT NULL,
    payment_date TIMESTAMP,
    name VARCHAR(50) NOT NULL,
    duration INT NOT NULL,
    price NUMERIC(6,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE SET NULL (user_id),
    CONSTRAINT fk_subscription_type FOREIGN KEY(subscription_type_id) REFERENCES subscription_types(id) ON DELETE SET NULL (subscription_type_id)
);

ALTER TABLE IF EXISTS subscriptions ENABLE ROW LEVEL SECURITY;