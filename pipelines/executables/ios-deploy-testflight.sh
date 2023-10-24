#!/bin/sh
echo $APP_STORE_AUTH_KEY_P8_64 | base64 -d > authkey.p8
cd RNMobileApp
fastlane ios deploy_to_test_flight