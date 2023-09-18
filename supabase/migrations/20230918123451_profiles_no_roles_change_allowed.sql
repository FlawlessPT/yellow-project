
DROP POLICY IF EXISTS "Users can update own profile." on profiles;

CREATE OR REPLACE FUNCTION is_not_updating_profiles_roles_field(
    _id UUID,
    roles text[]
) RETURNS BOOLEAN AS
$$
WITH original_row AS (
    SELECT roles
    FROM public.profiles
    WHERE profiles.id = _id
)
SELECT((SELECT roles FROM original_row) = roles)
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE POLICY "Users can only update their own profile and can not update roles" ON profiles FOR UPDATE USING (
    is_not_updating_profiles_roles_field(
        id,
        roles
    ) AND auth.uid() = id
)