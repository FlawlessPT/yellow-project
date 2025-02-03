BEGIN;

SELECT plan(6);

-- create users for testing
SELECT tests.create_supabase_user('admin_user');
SELECT tests.create_supabase_user('user');
SELECT tests.create_supabase_user('user1');

UPDATE profiles SET roles = array['ADMIN'] WHERE id = (SELECT tests.get_supabase_uid('admin_user'));

--ADMIN AUTHENTICATION
SELECT tests.authenticate_as('admin_user');

INSERT INTO subscription_types (name, duration, price, is_active) VALUES ('Test', 30, 9.99, true);

INSERT INTO subscriptions (user_id, subscription_type_id, status, payment_date, name, duration, price) VALUES 
    ((SELECT tests.get_supabase_uid('user')), (SELECT id FROM subscription_types WHERE name = 'Test'), 'active', now(), 'Test Subscription', 30, 9.99),
    ((SELECT tests.get_supabase_uid('user')), (SELECT id FROM subscription_types WHERE name = 'Test'), 'active', now(), 'Test Subscription Delete', 30, 9.99),
    ((SELECT tests.get_supabase_uid('user1')), (SELECT id FROM subscription_types WHERE name = 'Test'), 'active', now(), 'Test Subscription1', 30, 9.99);


SELECT set_has(
    $$SELECT name FROM subscriptions$$,
    $$VALUES ('Test Subscription')$$,
    'Admins can create and see subscriptions from users.'
);

SELECT results_eq(
    $$UPDATE subscriptions SET status = 'inactive' WHERE name = 'Test Subscription' returning status$$,
    $$VALUES ('inactive'::subscription_status_enum)$$,
    'Admins can update subscriptions.'
);

DELETE FROM subscriptions WHERE name = 'Test Subscription Delete';

SELECT set_hasnt(
    $$SELECT name FROM subscriptions$$,
    $$VALUES ('Test Subscription Delete')$$,
    'Admins can delete subscriptions.'
);

-- NORMAL USER AUTHENTICATION
SELECT tests.authenticate_as('user1');

SELECT set_has(
    $$SELECT name FROM subscriptions$$,
    $$VALUES ('Test Subscription1')$$,
    'Normal users can only see their own subscriptions.'
);

SELECT throws_ok(
    $$INSERT INTO subscriptions (user_id, subscription_type_id, status, payment_date, name, duration, price) VALUES 
    ((SELECT tests.get_supabase_uid('user')), (SELECT id FROM subscription_types WHERE name = 'Test'), 'active', now(), 'Test Subscription Insert', 30, 9.99)$$,
    '42501',
    NULL,
    'Normal users cant insert other''s subscriptions.'
);

INSERT INTO subscriptions (user_id, subscription_type_id, status, payment_date, name, duration, price) VALUES 
    ((SELECT tests.get_supabase_uid('user1')), (SELECT id FROM subscription_types WHERE name = 'Test'), 'active', now(), 'Test Own Subscription Insert', 30, 9.99);

SELECT set_has(
    $$SELECT name FROM subscriptions$$,
    $$VALUES ('Test Own Subscription Insert')$$,
    'Normal users can insert their own subscriptions.'
);



-- NO AUTHENTICATION
SELECT tests.clear_authentication();

SELECT * FROM finish();
ROLLBACK;
