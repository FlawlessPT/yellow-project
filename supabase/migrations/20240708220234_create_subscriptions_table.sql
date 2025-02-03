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
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE SET NULL,
    CONSTRAINT fk_subscription_type FOREIGN KEY(subscription_type_id) REFERENCES subscription_types(id) ON DELETE SET NULL
);

CREATE POLICY "Users can only see their own subscriptions while admins can see all subscriptions." 
    ON subscriptions
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Users can only insert their own subscriptions while admins can insert all subscriptions."
    ON subscriptions
    FOR INSERT
    TO authenticated 
    WITH CHECK (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update subscriptions."
    ON subscriptions
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete subscriptions."
    ON subscriptions
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS subscriptions ENABLE ROW LEVEL SECURITY;