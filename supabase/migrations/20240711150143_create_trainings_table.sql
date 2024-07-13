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

ALTER TABLE IF EXISTS trainings ENABLE ROW LEVEL SECURITY;