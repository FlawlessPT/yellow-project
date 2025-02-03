CREATE TABLE IF NOT EXISTS exercises_trainings (
    training_id INT NOT NULL,
    exercise_id INT NOT NULL,
    series INT NOT NULL,
    reps VARCHAR(200) NOT NULL,
    notes VARCHAR(2048),
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (training_id, exercise_id),
    CONSTRAINT fk_training FOREIGN KEY(training_id) REFERENCES trainings(id) ON DELETE CASCADE,
    CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

CREATE POLICY "Users can only see active exercises in their trainings unless they have admin role." 
    ON exercises_trainings
    FOR SELECT
    USING (
            is_active AND 
            (
                check_user_permission(auth.uid(), array['ADMIN']) OR 
                EXISTS (
                    SELECT 1 
                    FROM trainings 
                    JOIN training_plans ON trainings.training_plan_id = training_plans.id 
                    WHERE trainings.id = exercises_trainings.training_id 
                    AND training_plans.user_id = auth.uid()
                )
            )
        );
        
CREATE POLICY "Only admins can insert exercises in trainings."
    ON exercises_trainings
    FOR INSERT
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can update exercises in trainings."
    ON exercises_trainings
    FOR UPDATE
    TO authenticated 
    WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "Only admins can delete exercises in trainings."
    ON exercises_trainings
    FOR DELETE
    TO authenticated 
    USING (check_user_permission(auth.uid(), array['ADMIN']));

ALTER TABLE IF EXISTS exercises_trainings ENABLE ROW LEVEL SECURITY;