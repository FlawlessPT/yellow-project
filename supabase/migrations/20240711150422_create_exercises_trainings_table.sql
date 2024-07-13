CREATE TABLE IF NOT EXISTS exercises_trainings (
    training_id INT NOT NULL,
    exercise_id INT NOT NULL,
    series INT NOT NULL,
    reps VARCHAR(200) NOT NULL,
    notes VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (training_id, exercise_id),
    CONSTRAINT fk_training FOREIGN KEY(training_id) REFERENCES trainings(id) ON DELETE CASCADE,
    CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS exercises_trainings ENABLE ROW LEVEL SECURITY;