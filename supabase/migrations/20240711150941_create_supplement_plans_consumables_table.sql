CREATE TABLE IF NOT EXISTS supplement_plans_consumables (
    supplement_plan_id INT NOT NULL,
    consumable_id INT NOT NULL,
    quantity NUMERIC(5,2) NOT NULL,
    type supplement_consumable_type_enum NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (supplement_plan_id, consumable_id),
    CONSTRAINT fk_supplement_plan FOREIGN KEY(supplement_plan_id) REFERENCES supplement_plans(id) ON DELETE CASCADE,
    CONSTRAINT fk_consumable FOREIGN KEY(consumable_id) REFERENCES consumables(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see their own supplement plans consumables unless they have admin role." 
    ON supplement_plans_consumables
    FOR SELECT
    USING (check_user_permission(auth.uid(), array['ADMIN']) OR EXISTS (SELECT 1 FROM supplement_plans WHERE id = supplement_plan_id AND user_id = auth.uid()));

CREATE POLICY "Only admins can insert supplement plans consumables."
    ON supplement_plans_consumables
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update supplement plans consumables."
    ON supplement_plans_consumables
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete supplement plans consumables."
    ON supplement_plans_consumables
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS supplement_plans_consumables ENABLE ROW LEVEL SECURITY;

--teste