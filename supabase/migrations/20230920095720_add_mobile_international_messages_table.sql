create table "public"."mobile_international_messages" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "lng" text not null,
    "ns" text default 'translation', -- default namespace at i18next
    "messages" json not null
);

-- Indexes
CREATE UNIQUE INDEX mobile_international_messages_pkey ON public.mobile_international_messages USING btree (id);

alter table "public"."mobile_international_messages" add constraint "mobile_international_messages_pkey" PRIMARY KEY using index "mobile_international_messages_pkey";

CREATE UNIQUE INDEX mobile_international_messages_lng_ns_key ON public.mobile_international_messages USING btree (lng,ns);

-- Policies
alter table "public"."mobile_international_messages" enable row level security;

CREATE POLICY "public read access for mobile_international_messages"
ON public.mobile_international_messages
FOR SELECT USING (
  true
);

CREATE POLICY "insert only for ADMIN users for mobile_international_messages"
ON public.mobile_international_messages
FOR INSERT
TO authenticated WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "update only for ADMIN users for mobile_international_messages"
ON public.mobile_international_messages
FOR UPDATE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN'])) WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "delete only for ADMIN users for mobile_international_messages"
ON public.mobile_international_messages
FOR DELETE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN']));

-- Function to get messages for language and namespace
CREATE OR REPLACE FUNCTION json_mobile_international_messages_for(language TEXT, namespace TEXT)
RETURNS JSON AS
$$
DECLARE
    json_messages JSON;
BEGIN
    SELECT "messages" INTO json_messages FROM mobile_international_messages WHERE lng = language AND ns = namespace;
    RETURN json_messages;
END;
$$
LANGUAGE plpgsql;