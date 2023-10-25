#!/bin/sh
cd RNMobileApp
gem install fastlane
fastlane android build
npm install -g appcenter-cli
appcenter distribute release --app $APP_CENTER_PROJECT --file ./android/app/build/outputs/bundle/release/app-release.aab --group "Collaborators" --token $APP_CENTER_TOKEN