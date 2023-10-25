#!/bin/sh
source ./pipelines/executables/setup-mobile-app-for-build.sh
cd RNMobileApp
echo "VERSION_CODE=$BITBUCKET_BUILD_NUMBER" >> .env
echo "VERSION_NAME=$BITBUCKET_COMMIT" >> .env
echo "SENTRY_DSN=$SENTRY_DSN_RNAPP" >> .env
echo "ONE_SIGNAL_APP_ID=$ONE_SIGNAL_APP_ID" >> .env
echo "ANDROID_APPLICATION_ID=$ANDROID_APPLICATION_ID" >> .env
cd android
echo $ANDROID_KEY_STORE_64 | base64 -d > app/my-upload-key.keystore
echo "MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore" >> gradle.properties
echo "MYAPP_UPLOAD_KEY_ALIAS=my-key-alias" >> gradle.properties
echo "MYAPP_UPLOAD_STORE_PASSWORD=$ANDROID_KEY_STORE_PASSWORD" >> gradle.properties
echo "MYAPP_UPLOAD_KEY_PASSWORD=$ANDROID_KEY_STORE_PASSWORD" >> gradle.properties
cd ../..
