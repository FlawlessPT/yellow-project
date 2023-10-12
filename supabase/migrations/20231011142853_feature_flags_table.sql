create table "public"."feature_flags" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "key" text not null,
    "description" text,
    "users_ids" text[] default null,
    "active" boolean not null default false
);

-- Indexes
CREATE UNIQUE INDEX feature_flags_pkey ON public.feature_flags USING btree (id);

alter table "public"."feature_flags" add constraint "feature_flags_pkey" PRIMARY KEY using index "feature_flags_pkey";

CREATE UNIQUE INDEX feature_flags_key_key ON public.feature_flags USING btree (key);

-- Policies
alter table "public"."feature_flags" enable row level security;

CREATE POLICY "public read access for feature_flags"
ON public.feature_flags
FOR SELECT USING (
  true
);

CREATE POLICY "insert only for ADMIN users for feature_flags"
ON public.feature_flags
FOR INSERT
TO authenticated WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "update only for ADMIN users for feature_flags"
ON public.feature_flags
FOR UPDATE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN'])) WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "delete only for ADMIN users for feature_flags"
ON public.feature_flags
FOR DELETE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN']));