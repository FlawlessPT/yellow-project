CREATE TABLE IF NOT EXISTS supplement_plans_consumables (
    supplement_plan_id INT NOT NULL,
    consumable_id INT NOT NULL,
    quantity NUMERIC(5,2) NOT NULL,
    type ENUM('pre-workout', 'post-workout', 'intra-workout', 'daily', 'meal', 'main-meal') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (supplement_plan_id, consumable_id),
    CONSTRAINT fk_supplement_plan FOREIGN KEY(supplement_plan_id) REFERENCES Supplement_Plan(supplement_plan_id) ON DELETE CASCADE,
    CONSTRAINT fk_consumable FOREIGN KEY(consumable_id) REFERENCES Consumable(consumable_id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS supplement_plans_consumables ENABLE ROW LEVEL SECURITY;