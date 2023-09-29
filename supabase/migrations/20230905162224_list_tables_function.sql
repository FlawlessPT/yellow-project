-- inspiration from here: https://github.com/orgs/supabase/discussions/8948
create or replace function get_all_table_name()
returns TABLE (table_name text)
as $$
  select table_name from information_schema.tables
  where table_schema = 'public';
$$ language sql;