#!/bin/sh
cd supabase
yarn install --frozen-lockfile
yarn supabase-configs
cd ../BackofficeCMS
yarn install --frozen-lockfile
npm install --global vercel