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

ALTER TABLE IF EXISTS food_plans ENABLE ROW LEVEL SECURITY;