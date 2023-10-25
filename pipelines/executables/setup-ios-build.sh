#!/bin/sh
source ./pipelines/executables/setup-mobile-app-for-build.sh
cd RNMobileApp
yarn ios:clean:pod-install
echo "SENTRY_DSN=$SENTRY_DSN_RNAPP" >> .env
cd ..
