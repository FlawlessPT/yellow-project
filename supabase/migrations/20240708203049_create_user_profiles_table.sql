CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    photo_url VARCHAR(2048),
    phone_number VARCHAR(20) NOT NULL,
    gender gender_enum NOT NULL,
    height NUMERIC(5,2) NOT NULL,
    weight NUMERIC(5,2) NOT NULL,
    diet_type diet_type_enum NOT NULL,
    diet_notes VARCHAR(2048),
    workout_routine_type workout_routine_type_enum NOT NULL,
    workout_routine_notes VARCHAR(2048),
    front_photo_url VARCHAR(2048) NOT NULL,
    back_photo_url VARCHAR(2048) NOT NULL,
    side_photo_url VARCHAR(2048) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY(id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS user_profiles ENABLE ROW LEVEL SECURITY;