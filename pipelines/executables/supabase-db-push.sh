#!/bin/sh
cd supabase
npx supabase link --project-ref $SUPABASE_PROJECT_ID
npx supabase db push