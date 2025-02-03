#!/bin/bash
 
case $ENVIRONMENT in
  "DEV")
    yarn run-dev
    ;;
  "STAGING")
    yarn run-stg
    ;;
  "PROD")
    yarn run-stg
    ;;
  *)
    echo "No build script for ENVIRONMENT value of $VERCEL_ENV"
    exit 1
    ;;
esac