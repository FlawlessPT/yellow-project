CREATE TABLE IF NOT EXISTS consumables (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) UNIQUE NOT NULL,
    protein INT NOT NULL,
    fat INT NOT NULL,
    carbs INT NOT NULL,
    kcal INT NOT NULL,
    type consumable_type_enum NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE POLICY "Users can see consumables that are present in their food plans unless they have admin role." 
    ON consumables
    FOR SELECT
    USING (
        check_user_permission(auth.uid(), array['ADMIN']) OR 
        EXISTS (
            SELECT 1 
            FROM consumables_meals 
            JOIN meals ON consumables_meals.meal_id = meals.id 
            JOIN food_plans ON meals.food_plan_id = food_plans.id 
            WHERE consumables_meals.consumable_id = consumables.id 
            AND food_plans.user_id = auth.uid()
        )
    );

CREATE POLICY "Only admins can insert consumables."
    ON consumables
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update consumables."
    ON consumables
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete consumables."
    ON consumables
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS consumables ENABLE ROW LEVEL SECURITY;