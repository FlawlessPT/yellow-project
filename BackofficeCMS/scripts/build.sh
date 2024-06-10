#!/bin/bash
 
case $VERCEL_ENV in
  "development")
    npm run build:development
    ;;
  "staging")
    npm run build:staging
    ;;
  "production")
    npm run build:production
    ;;
  *)
    echo "No build script for VERCEL_ENV value of $VERCEL_ENV"
    exit 1
    ;;
esac