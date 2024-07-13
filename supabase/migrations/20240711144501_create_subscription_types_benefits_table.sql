CREATE TABLE IF NOT EXISTS subscription_types_benefits (
    subscription_type_id INT NOT NULL,
    subscription_benefit_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (subscription_type_id, subscription_benefit_id),
    CONSTRAINT fk_subscription_type FOREIGN KEY(subscription_type_id) REFERENCES subscription_types(id) ON DELETE CASCADE,
    CONSTRAINT fk_subscription_benefit FOREIGN KEY(subscription_benefit_id) REFERENCES subscription_benefits(id) ON DELETE CASCADE
);

ALTER TABLE IF EXISTS subscription_types_benefits ENABLE ROW LEVEL SECURITY;