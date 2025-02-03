CREATE TABLE IF NOT EXISTS subscription_benefits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE POLICY "Users can see only active subscription benefits unless they have admin role." 
    ON subscription_benefits
    FOR SELECT
    USING (is_active OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can insert subscription benefits."
    ON subscription_benefits
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update subscription benefits."
    ON subscription_benefits
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete subscription benefits."
    ON subscription_benefits
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS subscription_benefits ENABLE ROW LEVEL SECURITY;
