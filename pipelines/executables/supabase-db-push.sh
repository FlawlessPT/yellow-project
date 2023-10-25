#!/bin/sh
echo "SUPABASE_PROJECT: $SUPABASE_PROJECT_ID"
cd supabase
npx supabase link --project-ref $SUPABASE_PROJECT_ID
npx supabase db push