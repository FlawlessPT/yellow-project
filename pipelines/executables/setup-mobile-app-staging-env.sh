#!/bin/sh
# https://docs.fastlane.tools/getting-started/ios/setup/#set-up-environment-variables
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
export SUPABASE_URL=$SUPABASE_PROJECT_URL_STAGING
export SUPABASE_API_KEY=$SUPABASE_API_KEY_STAGING
export SENTRY_PROJECT=$SENTRY_PROJECT_RNAPP