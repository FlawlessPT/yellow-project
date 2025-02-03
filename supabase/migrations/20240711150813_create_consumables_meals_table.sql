CREATE TABLE IF NOT EXISTS consumables_meals (
    consumable_id INT NOT NULL,
    meal_id INT NOT NULL,
    quantity NUMERIC(5,2) NOT NULL,
    unit unit_enum NOT NULL,
    notes VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (consumable_id, meal_id),
    CONSTRAINT fk_consumable FOREIGN KEY(consumable_id) REFERENCES consumables(id) ON DELETE CASCADE,
    CONSTRAINT fk_meal FOREIGN KEY(meal_id) REFERENCES meals(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see their own consumables in their meals unless they have admin role." 
    ON consumables_meals
    FOR SELECT
    USING (check_user_permission(auth.uid(), array['ADMIN']) OR EXISTS (SELECT 1 FROM meals WHERE id = meal_id AND user_id = auth.uid()));

CREATE POLICY "Only admins can insert consumables in meals."
    ON consumables_meals
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update consumables in meals."
    ON consumables_meals
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete consumables in meals."
    ON consumables_meals
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS consumables_meals ENABLE ROW LEVEL SECURITY;