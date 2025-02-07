ALTER TABLE subscription_types_benefits
DROP CONSTRAINT subscription_types_benefits_pkey;

ALTER TABLE subscription_types_benefits
ADD COLUMN id SERIAL PRIMARY KEY;

ALTER TABLE subscription_types_benefits
ADD UNIQUE (subscription_type_id, subscription_benefit_id);

ALTER TABLE exercises_trainings
DROP CONSTRAINT exercises_trainings_pkey;

ALTER TABLE exercises_trainings
ADD COLUMN id SERIAL PRIMARY KEY;

ALTER TABLE exercises_trainings
ADD UNIQUE (training_id, exercise_id);

ALTER TABLE consumables_meals
DROP CONSTRAINT consumables_meals_pkey;

ALTER TABLE consumables_meals
ADD COLUMN id SERIAL PRIMARY KEY;

ALTER TABLE consumables_meals
ADD UNIQUE (consumable_id, meal_id);

ALTER TABLE supplement_plans_consumables
DROP CONSTRAINT supplement_plans_consumables_pkey;

ALTER TABLE supplement_plans_consumables
ADD COLUMN id SERIAL PRIMARY KEY;

ALTER TABLE supplement_plans_consumables
ADD UNIQUE (supplement_plan_id, consumable_id);