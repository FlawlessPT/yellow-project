create table "public"."tutorial" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "lng" text not null,
    "configs" json not null
);

-- Indexes
CREATE UNIQUE INDEX tutorial_pkey ON tutorial USING btree (id);

alter table "public"."tutorial" add constraint "tutorial_pkey" PRIMARY KEY using index "tutorial_pkey";

CREATE UNIQUE INDEX tutorial_lng_key ON public.tutorial USING btree (lng);

-- Policies
alter table "public"."tutorial" enable row level security;

CREATE POLICY "public read access for tutorial"
ON public.tutorial
FOR SELECT USING (
  true
);

CREATE POLICY "insert only for ADMIN users for tutorial"
ON public.tutorial
FOR INSERT
TO authenticated WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "update only for ADMIN users for tutorial"
ON public.tutorial
FOR UPDATE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN'])) WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "delete only for ADMIN users for tutorial"
ON public.tutorial
FOR DELETE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN']));

-- Function to get messages for language and namespace
CREATE OR REPLACE FUNCTION get_tutorial(language TEXT)
RETURNS JSON AS
$$
DECLARE
    json_configs JSON;
BEGIN
    SELECT json_agg(configs) INTO json_configs
    FROM tutorial
    WHERE lng = language;

    RETURN COALESCE(json_configs);
END;
$$
LANGUAGE plpgsql;