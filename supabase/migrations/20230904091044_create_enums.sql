CREATE TYPE gender_enum AS ENUM ('male', 'female', 'other');
CREATE TYPE diet_type_enum AS ENUM ('vegan', 'vegetarian', 'traditional', 'other');
CREATE TYPE workout_routine_type_enum AS ENUM ('begginer', 'irregular', 'medium', 'advanced');
CREATE TYPE subscription_status_enum AS ENUM ('active', 'inactive', 'payment_pending');
CREATE TYPE update_status_enum AS ENUM ('pending', 'approved');
CREATE TYPE plan_status_enum AS ENUM ('active', 'inactive');
CREATE TYPE cardio_type_enum AS ENUM ('pre-workout', 'post-workout', 'other');
CREATE TYPE consumable_type_enum AS ENUM ('food', 'supplement');
CREATE TYPE unit_enum AS ENUM ('g', 'kg', 'l', 'ml', 'slice', 'un');
CREATE TYPE supplement_consumable_type_enum AS ENUM ('pre-workout', 'post-workout', 'intra-workout', 'daily', 'meal', 'main-meal');