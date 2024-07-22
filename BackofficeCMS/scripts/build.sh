#!/bin/bash
 
case $ENVIRONMENT in
  "DEV")
    yarn build:development
    ;;
  "STAGING")
    yarn build:staging
    ;;
  "PROD")
    yarn build:production
    ;;
  *)
    echo "No build script for VERCEL_ENV value of $VERCEL_ENV"
    # To check if it should be removed    
    # exit 1
    ;;
esac