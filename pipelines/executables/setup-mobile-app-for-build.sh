#!/bin/sh
cd supabase
yarn install --frozen-lockfile
yarn supabase-configs-mobile
cd ../RNMobileApp
yarn install
cd ..