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

CREATE POLICY "Users can only see active subscription types unless they have admin role." 
    ON subscription_types
    FOR SELECT
    USING (is_active OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can insert subscription types."
    ON subscription_types
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update subscription types."
    ON subscription_types
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete subscription types."
    ON subscription_types
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS subscription_types ENABLE ROW LEVEL SECURITY;