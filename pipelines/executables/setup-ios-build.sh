#!/bin/sh
source ./pipelines/executables/setup-mobile-app-for-build.sh
cd RNMobileApp
yarn ios:clean:pod-install
echo "SENTRY_DSN=$SENTRY_DSN_RNAPP" >> .env
echo "ONE_SIGNAL_APP_ID=$ONE_SIGNAL_APP_ID" >> .env
sed 's/pt.mobiweb.framework.RNMobileApp/'"$APP_STORE_BUNDLE_ID"'/g' ios/RNMobileApp.xcodeproj/project.pbxproj > tmp.txt && mv tmp.txt ios/RNMobileApp.xcodeproj/project.pbxproj
cd ..
