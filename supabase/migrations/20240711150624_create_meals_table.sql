CREATE TABLE IF NOT EXISTS meals (
    id SERIAL PRIMARY KEY,
    food_plan_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_food_plan FOREIGN KEY(food_plan_id) REFERENCES food_plans(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see their own meals unless they have admin role." 
    ON meals
    FOR SELECT
    USING (food_plan_id IN (SELECT id FROM food_plans WHERE user_id = auth.uid()) OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can insert meals."
    ON meals
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update meals."
    ON meals
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete meals."
    ON meals
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS meals ENABLE ROW LEVEL SECURITY;