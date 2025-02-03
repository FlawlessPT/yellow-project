CREATE TABLE IF NOT EXISTS supplement_plans (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    status plan_status_enum NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see their own supplement plans unless they have admin role." 
    ON supplement_plans
    FOR SELECT
    USING (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can insert supplement plans."
    ON supplement_plans
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update supplement plans."
    ON supplement_plans
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete supplement plans."
    ON supplement_plans
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS supplement_plans ENABLE ROW LEVEL SECURITY;