#!/bin/sh
cd RNMobileApp
cd android
echo $ANDROID_SERVICE_ACCOUNT_KEY_64 | base64 -d > app/service-account-key.json
cd ..
gem install fastlane
fastlane android deploy_internal_play_store