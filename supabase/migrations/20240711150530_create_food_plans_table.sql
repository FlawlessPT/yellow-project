CREATE TABLE IF NOT EXISTS food_plans (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    status plan_status_enum NOT NULL,
    protein_goal INT,
    fat_goal INT,
    carbs_goal INT,
    kcal_goal INT,
    water_goal VARCHAR(300),
    notes VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see their own food plans unless they have admin role." 
    ON food_plans
    FOR SELECT
    USING (user_id = auth.uid() OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can insert food plans."
    ON food_plans
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update food plans."
    ON food_plans
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete food plans."
    ON food_plans
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS food_plans ENABLE ROW LEVEL SECURITY;