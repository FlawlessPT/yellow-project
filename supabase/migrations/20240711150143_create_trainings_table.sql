CREATE TABLE IF NOT EXISTS trainings (
    id SERIAL PRIMARY KEY,
    training_plan_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    day_of_week INT NOT NULL,
    is_completed BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_training_plan FOREIGN KEY(training_plan_id) REFERENCES training_plans(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see their own trainings unless they have admin role." 
    ON trainings
    FOR SELECT
    USING (training_plan_id IN (SELECT id FROM training_plans WHERE user_id = auth.uid()) OR check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can insert trainings."
    ON trainings
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

SET LOCAL app.new_training_plan_id = 'new_training_plan_id_value';
SET LOCAL app.new_name = 'new_name_value';
SET LOCAL app.new_day_of_week = 'new_day_of_week_value';
SET LOCAL app.new_created_at = 'new_created_at_value';

CREATE POLICY "Users can only update their own trainings while admins can update any."
    ON trainings
    FOR UPDATE
    TO authenticated 
    USING (
        training_plan_id IN (SELECT id FROM training_plans WHERE user_id = auth.uid()) 
        OR check_user_permission(auth.uid(), array['ADMIN'])
    )
    WITH CHECK (
        check_user_permission(auth.uid(), array['ADMIN']) 
        OR (
            training_plan_id IN (SELECT id FROM training_plans WHERE user_id = auth.uid()) 
            AND training_plan_id = current_setting('app.new_training_plan_id')::INT 
            AND name = current_setting('app.new_name') 
            AND day_of_week = current_setting('app.new_day_of_week')::INT 
            AND created_at = current_setting('app.new_created_at')::TIMESTAMP
        )
    );

CREATE POLICY "Only admins can delete trainings."
    ON trainings
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));


ALTER TABLE IF EXISTS trainings ENABLE ROW LEVEL SECURITY;