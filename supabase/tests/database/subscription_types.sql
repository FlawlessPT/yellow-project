BEGIN;

SELECT plan(11);

-- create users for testing
SELECT tests.create_supabase_user('admin_user');
SELECT tests.create_supabase_user('user');

UPDATE profiles SET roles = array['ADMIN'] WHERE id = (SELECT tests.get_supabase_uid('admin_user'));

--ADMIN AUTHENTICATION
SELECT tests.authenticate_as('admin_user');

INSERT INTO subscription_types (name, duration, price, is_active) VALUES 
    ('Test Update', 30, 9.99, true),
    ('Test Delete', 30, 9.99, true),
    ('Test Delete 1', 30, 9.99, true),
    ('Test Inactive', 30, 9.99, false),
    ('Test Anon Update', 30, 9.99, true),
    ('Test Anon Delete', 30, 9.99, true);


SELECT set_has(
    $$SELECT is_active FROM subscription_types$$,
    $$VALUES (true), (false)$$,
    'Admins can create and see all subscription types.'
);

SELECT results_eq(
    $$UPDATE subscription_types SET name = 'Test Update 1' WHERE name = 'Test Update' returning name$$,
    $$VALUES ('Test Update 1'::varchar)$$,
    'Admins can update subscription types.'
);

DELETE FROM subscription_types WHERE name = 'Test Delete';

SELECT set_hasnt(
    $$SELECT name FROM subscription_types$$,
    $$VALUES ('Test Delete')$$,
    'Admins can delete subscription types.'
);

-- NORMAL USER AUTHENTICATION
SELECT tests.authenticate_as('user');

SELECT set_hasnt(
    $$SELECT is_active FROM subscription_types$$,
    $$VALUES (false)$$,
    'Normal users can only see active subscription types.'
);

SELECT throws_ok(
    $$INSERT INTO subscription_types (name, duration, price, is_active) VALUES ('Test Insert', 30, 9.99, true)$$,
    '42501',
    NULL,
    'Normal users cant insert subscription types.'
);

SELECT is_empty(
    $$UPDATE subscription_types SET name = 'Test Update 2' WHERE name = 'Test Update 1' returning name$$,
    'Normal users cant update subscription types.'
);

DELETE FROM subscription_types WHERE name = 'Test Delete 1';

SELECT set_has(
    $$SELECT name FROM subscription_types$$,
    $$VALUES ('Test Delete 1')$$,
    'Normal users cant delete subscription types.'
);

-- NO AUTHENTICATION
SELECT tests.clear_authentication();

SELECT is(
    (SELECT EXISTS (
        SELECT *
        FROM subscription_types
        WHERE is_active = true
    ) AND NOT EXISTS (
        SELECT *
        FROM subscription_types
        WHERE is_active = false
    )),
    true,
    'Anon users can see only see active subscription types.'
);

SELECT throws_ok(
    $$INSERT INTO subscription_types (name, duration, price, is_active) VALUES ('Test Anon Insert', 30, 9.99, true)$$,
    '42501',
    NULL,
    'Anon users cant insert subscription types.'
);

SELECT is_empty(
    $$UPDATE subscription_types SET name = 'Test Anon Update 1' WHERE name = 'Test Anon Update' returning name$$,
    'Anon users cant update subscription types.'
);

DELETE FROM subscription_types WHERE name = 'Test Anon Delete';

SELECT set_has(
    $$SELECT name FROM subscription_types$$,
    $$VALUES ('Test Anon Delete')$$,
    'Anon users cant delete subscription types.'
);

SELECT * FROM finish();
ROLLBACK;
