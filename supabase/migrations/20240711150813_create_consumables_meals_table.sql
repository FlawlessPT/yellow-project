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

ALTER TABLE IF EXISTS consumables_meals ENABLE ROW LEVEL SECURITY;