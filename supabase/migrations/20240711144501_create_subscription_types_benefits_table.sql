CREATE TABLE IF NOT EXISTS subscription_types_benefits (
    subscription_type_id INT NOT NULL,
    subscription_benefit_id INT NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (subscription_type_id, subscription_benefit_id),
    CONSTRAINT fk_subscription_type FOREIGN KEY(subscription_type_id) REFERENCES subscription_types(id) ON DELETE CASCADE,
    CONSTRAINT fk_subscription_benefit FOREIGN KEY(subscription_benefit_id) REFERENCES subscription_benefits(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see active subscription types benefits unless they have admin role." 
    ON subscription_types
    FOR SELECT
    USING (is_active OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can insert subscription types benefits."
    ON subscription_types_benefits
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update subscription types benefits."
    ON subscription_types_benefits
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete subscription types benefits."
    ON subscription_types_benefits
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS subscription_benefits ENABLE ROW LEVEL SECURITY;
