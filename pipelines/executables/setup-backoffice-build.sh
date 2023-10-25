#!/bin/sh
export SENTRY_PROJECT=$SENTRY_PROJECT_BACKOFFICE
export VITE_SENTRY_DSN=$SENTRY_DSN_BACKOFFICE

cd supabase
yarn install --frozen-lockfile
yarn supabase-configs
cd ../BackofficeCMS
yarn install --frozen-lockfile
npm install --global vercel