#!/bin/sh
# https://docs.fastlane.tools/getting-started/ios/setup/#set-up-environment-variables
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export SENTRY_PROJECT=$SENTRY_PROJECT_RNAPP

cd supabase
yarn install --frozen-lockfile
yarn supabase-configs-mobile
cd ../RNMobileApp
yarn install
cd ..