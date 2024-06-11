#!/bin/bash
 
case $ENVIRONMENT in
  "DEV")
    npm run build:development
    ;;
  "STAGING")
    npm run build:staging
    ;;
  "PROD")
    npm run build:production
    ;;
  *)
    echo "No build script for VERCEL_ENV value of $VERCEL_ENV"
    exit 1
    ;;
esac