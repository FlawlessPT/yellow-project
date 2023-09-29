-- inspiration from https://stackoverflow.com/questions/74994416/how-to-get-a-list-of-postgres-types-from-supabase-table
CREATE OR REPLACE FUNCTION get_types(tname text)
    RETURNS TABLE ( column_name text,data_type text,is_nullable text ) AS
    $BODY$
      BEGIN
          RETURN QUERY EXECUTE format($$SELECT column_name::text,data_type::text,is_nullable::text FROM information_schema.columns WHERE table_name ='$$|| '%I' ||$$';$$,tname);
      END;
    $BODY$
    LANGUAGE plpgsql;