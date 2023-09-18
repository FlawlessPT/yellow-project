create table "public"."custom_pages" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "title" text,
    "content" text not null,
    "slug" text not null
);


alter table "public"."custom_pages" enable row level security;

CREATE UNIQUE INDEX custom_pages_pkey ON public.custom_pages USING btree (id);

CREATE UNIQUE INDEX custom_pages_slug_key ON public.custom_pages USING btree (slug);

alter table "public"."custom_pages" add constraint "custom_pages_pkey" PRIMARY KEY using index "custom_pages_pkey";

alter table "public"."custom_pages" add constraint "custom_pages_slug_key" UNIQUE using index "custom_pages_slug_key";