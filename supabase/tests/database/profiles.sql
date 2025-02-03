BEGIN;

SELECT plan(7);

-- create users for testing
SELECT tests.create_supabase_user('user1');
SELECT tests.create_supabase_user('user2');

SELECT tests.authenticate_as('user1');

SELECT results_eq(
    $$SELECT id FROM profiles$$,
    $$VALUES ((SELECT tests.get_supabase_uid('user1')))$$,
    'Users can only see their own profile.'
);

SELECT throws_ok(
    $$INSERT INTO profiles (id) VALUES (gen_random_uuid())$$,
    '42501',
    NULL,
    'Users can only insert their own profile.'
);

SELECT results_eq(
    $$UPDATE profiles SET first_name = 'John' WHERE id = (SELECT tests.get_supabase_uid('user1')) returning first_name$$,
    $$VALUES (('John')::varchar)$$,
    'Users can update their own profile.'
);

SELECT is_empty(
    $$UPDATE profiles SET first_name = 'John' WHERE id = (SELECT tests.get_supabase_uid('user2')) returning first_name$$,
    'Users cant update other users profile.'
);


-- WITHOUT AUTHENTICATION
SELECT tests.clear_authentication();

SELECT throws_ok(
    $$INSERT INTO profiles (id) VALUES (gen_random_uuid())$$,
    '42501',
    NULL,
    'Anon users cant create profile.'
);

SELECT is_empty(
    $$UPDATE profiles SET first_name = 'John' WHERE id = (SELECT tests.get_supabase_uid('user1')) returning first_name$$,
    'Anon users cant update others profiles.'
);

SELECT is_empty(
    $$SELECT * FROM profiles$$,
    'Anon users cant see profiles.'
);

SELECT * FROM finish();
ROLLBACK;
