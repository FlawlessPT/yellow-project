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

CREATE POLICY "Users can only see their own daily updates unless they have admin role." 
    ON daily_updates
    FOR SELECT
    USING (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Users can only insert their own daily updates while admins can insert any."
    ON daily_updates
    FOR INSERT
    TO authenticated 
    WITH CHECK (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Users can only update their own daily updates while admins can update any."
    ON daily_updates
    FOR UPDATE
    TO authenticated 
    WITH CHECK (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Users can only delete their own daily updates while admins can delete any."
    ON daily_updates
    FOR DELETE
    TO authenticated 
    USING (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS daily_updates ENABLE ROW LEVEL SECURITY;