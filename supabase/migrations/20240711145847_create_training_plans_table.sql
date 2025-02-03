CREATE TABLE IF NOT EXISTS training_plans (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    status plan_status_enum NOT NULL,
    cardio INT,
    cardio_type cardio_type_enum,
    notes VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see their own training plans unless they have admin role." 
    ON training_plans
    FOR SELECT
    USING (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can insert training plans."
    ON training_plans
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update training plans."
    ON training_plans
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete training plans."
    ON training_plans
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS training_plans ENABLE ROW LEVEL SECURITY;