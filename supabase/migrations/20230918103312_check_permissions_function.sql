-- User should have one of the roles in order to access
CREATE OR REPLACE FUNCTION check_user_permission (user_id UUID, roles text[])
RETURNS BOOL
LANGUAGE SQL
SECURITY DEFINER
AS
$$
  SELECT EXISTS (
    SELECT profiles.id
    FROM profiles
    WHERE (profiles.id = $1) AND (profiles.roles && $2)
  )
$$;