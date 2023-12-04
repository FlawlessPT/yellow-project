create table "public"."tutorials" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "lng" text not null,
    "configs" json not null
);

-- Indexes
CREATE UNIQUE INDEX tutorials_pkey ON tutorials USING btree (id);

alter table "public"."tutorials" add constraint "tutorials_pkey" PRIMARY KEY using index "tutorials_pkey";

CREATE UNIQUE INDEX tutorials_lng_key ON public.tutorials USING btree (lng);

-- Policies
alter table "public"."tutorials" enable row level security;

CREATE POLICY "public read access for tutorials"
ON public.tutorials
FOR SELECT USING (
  true
);

CREATE POLICY "insert only for ADMIN users for tutorials"
ON public.tutorials
FOR INSERT
TO authenticated WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "update only for ADMIN users for tutorials"
ON public.tutorials
FOR UPDATE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN'])) WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "delete only for ADMIN users for tutorial"
ON public.tutorials
FOR DELETE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN']));

