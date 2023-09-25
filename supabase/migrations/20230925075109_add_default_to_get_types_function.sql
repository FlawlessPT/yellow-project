DROP FUNCTION IF EXISTS get_types;

CREATE OR REPLACE FUNCTION get_types(tname text)
    RETURNS TABLE ( column_name text,data_type text,is_nullable text, default_value text) AS
    $BODY$
      BEGIN
          RETURN QUERY EXECUTE format($$SELECT column_name::text,data_type::text,is_nullable::text,column_default::text FROM information_schema.columns WHERE table_name ='$$|| '%I' ||$$';$$,tname);
      END;
    $BODY$
    LANGUAGE plpgsql;