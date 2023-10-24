#!/bin/sh
cd supabase
yarn install --frozen-lockfile
yarn supabase-configs-mobile
cd ../RNMobileApp
yarn install
yarn ios:clean:pod-install
echo "SENTRY_DSN=$SENTRY_DSN_RNAPP" >> .env
