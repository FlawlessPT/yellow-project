CREATE TABLE IF NOT EXISTS updates (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    weight NUMERIC(5,2) NOT NULL,
    body_fat NUMERIC(5,2),
    lean_mass NUMERIC(5,2),
    front_photo_url VARCHAR(2048) NOT NULL,
    back_photo_url VARCHAR(2048) NOT NULL,
    side_photo_url VARCHAR(2048) NOT NULL,
    notes VARCHAR(2048) NOT NULL,
    feedback VARCHAR(2048),
    status update_status_enum NOT NULL,
    next_update_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see their own updates unless they have admin role." 
    ON updates
    FOR SELECT
    USING (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Users can only insert their own updates while admins can insert any."
    ON updates
    FOR INSERT
    TO authenticated 
    WITH CHECK (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Users can only update their own updates while admins can update any."
    ON updates
    FOR UPDATE
    TO authenticated 
    WITH CHECK (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete updates."
    ON updates
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS updates ENABLE ROW LEVEL SECURITY;